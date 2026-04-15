import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { FormEvent, KeyboardEvent, useEffect, useRef, useMemo, useState } from "react";
import { BiArrowBack, BiPaperPlane } from "react-icons/bi";
import { BsChatDotsFill } from "react-icons/bs";
import toast from "react-hot-toast";

import Avatar from "@/components/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMessages from "@/hooks/useMessages";
import useMessageThread from "@/hooks/useMessageThread";
import useReadMessages from "@/hooks/useReadMessages";
import useUser from "@/hooks/useUser";

type MessageThreadPaneProps = {
  userId?: string;
  onBack?: () => void;
  compact?: boolean;
};

const MessageThreadPane = ({
  userId,
  onBack,
  compact = false,
}: MessageThreadPaneProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fallbackUser } = useUser(userId);
  const { mutate: mutateInbox } = useMessages();
  const markThreadRead = useReadMessages((state) => state.markThreadRead);
  const { data: threadData, mutate: mutateThread, isLoading } =
    useMessageThread(userId);
  const [messageBody, setMessageBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const syncedReadThreadId = useRef<string | undefined>(undefined);

  const otherUser = threadData?.otherUser || fallbackUser;
  const messages = useMemo(() => threadData?.messages || [], [threadData?.messages]);

  useEffect(() => {
    if (!userId || syncedReadThreadId.current === userId) {
      return;
    }

    syncedReadThreadId.current = userId;
    markThreadRead(userId);

    const syncReadState = async () => {
      try {
        await axios.patch(`/api/messages/${userId}`);
        await mutateInbox(
          (current:
            | {
                unreadCount?: number;
                threads?: Array<{
                    unreadCount?: number;
                    user: { id: string };
                  }>;
              }
            | undefined) => {
            if (!current?.threads) {
              return current;
            }

            const nextThreads = current.threads.map((thread) =>
              thread.user.id === userId
                ? { ...thread, unreadCount: 0 }
                : thread,
            );

            return {
              ...current,
              threads: nextThreads,
              unreadCount: nextThreads.reduce(
                (total, thread) => total + (thread.unreadCount || 0),
                0,
              ),
            };
          },
          { revalidate: true },
        );
      } catch (error) {
        console.error("Failed to sync thread read state", error);
      }
    };

    void syncReadState();
  }, [markThreadRead, mutateInbox, userId]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId || !messageBody.trim()) {
      return;
    }

    const optimisticMessage = {
      id: `optimistic-${Date.now()}`,
      body: messageBody.trim(),
      createdAt: new Date().toISOString(),
      senderId: currentUser?.id,
      recipientId: userId,
      seenAt: null,
      sender: currentUser,
      recipient: otherUser,
    };
    const previousThread = threadData;

    try {
      setIsSending(true);
      await mutateThread(
        (current:
          | {
              messages?: typeof optimisticMessage[];
              otherUser?: typeof otherUser;
            }
          | undefined) => ({
          otherUser: current?.otherUser || otherUser,
          messages: [...(current?.messages || []), optimisticMessage],
        }),
        { revalidate: false },
      );
      setMessageBody("");

      const response = await axios.post("/api/messages", {
        recipientId: userId,
        body: optimisticMessage.body,
      });

      await mutateThread(
        (current:
          | {
              messages?: Array<{
                  id: string;
                  body: string;
                  createdAt: string;
                  senderId: string;
                }>;
              otherUser?: typeof otherUser;
            }
          | undefined) => ({
          otherUser: current?.otherUser || otherUser,
          messages: [
            ...(current?.messages || []).filter(
              (message) => message.id !== optimisticMessage.id,
            ),
            response.data,
          ],
        }),
        { revalidate: false },
      );

      await mutateInbox();
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : null;

      toast.error(message || "Your message didn’t send");
      await mutateThread(previousThread, { revalidate: false });
    } finally {
      setIsSending(false);
    }
  };

  const handleComposerKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (!messageBody.trim() || isSending) {
      return;
    }

    await onSubmit(event as unknown as FormEvent<HTMLFormElement>);
  };

  if (!userId) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="rounded-full border border-neutral-800 bg-neutral-900/70 p-4 text-sky-400">
          <BsChatDotsFill size={24} />
        </div>
        <p className="mt-5 text-2xl font-semibold text-white">Open a Dee-EM</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
          Choose a conversation or start one from someone&apos;s profile.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`border-b border-neutral-800 ${
          compact ? "px-5 py-4" : "px-5 py-4 lg:px-6"
        }`}
      >
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="rounded-full p-2 text-neutral-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <BiArrowBack size={18} />
            </button>
          ) : null}
          {otherUser ? <Avatar userId={otherUser.id} /> : null}
          <div className="min-w-0">
            <p className="font-semibold text-white">
              {otherUser?.name || "Loading conversation..."}
            </p>
            <p className="truncate text-sm text-neutral-500">
              @ {otherUser?.username || "glitter"}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`flex-1 space-y-4 overflow-y-auto ${
          compact ? "px-5 py-5" : "px-5 py-5 lg:px-6"
        }`}
      >
        {messages.length ? (
          messages.map(
            (message: {
              id: string;
              body: string;
              createdAt: string;
              senderId: string;
            }) => {
              const isOwn = message.senderId === currentUser?.id;

              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      isOwn
                        ? "bg-sky-500 text-white"
                        : "border border-neutral-800 bg-neutral-900/70 text-neutral-100"
                    }`}
                  >
                    <p>{message.body}</p>
                    <p
                      className={`mt-2 text-[11px] ${
                        isOwn ? "text-sky-100/80" : "text-neutral-500"
                      }`}
                    >
                      {formatDistanceToNowStrict(new Date(message.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            },
          )
        ) : (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold text-white">
              {isLoading ? "Loading conversation..." : `Say hi to ${otherUser?.name || "this user"}`}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              Dee-EMs are private between the two of you, so this is the place for the quieter side of Glitter.
            </p>
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="border-t border-neutral-800 bg-neutral-950 px-5 py-4"
      >
        <div className="flex items-end gap-3">
          <textarea
            value={messageBody}
            onChange={(event) => setMessageBody(event.target.value)}
            onKeyDown={handleComposerKeyDown}
            placeholder={`Dee-EM ${otherUser?.name || otherUser?.username || "them"}...`}
            className="min-h-[64px] flex-1 resize-none rounded-3xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500/40"
          />
          <button
            type="submit"
            disabled={isSending || !messageBody.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BiPaperPlane size={20} />
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageThreadPane;
