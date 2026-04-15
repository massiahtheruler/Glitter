import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";

import Avatar from "@/components/Avatar";
import BrandLoader from "@/components/BrandLoader";
import Header from "@/components/Header";
import MessageThreadPane from "@/components/messages/MessageThreadPane";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMessages from "@/hooks/useMessages";
import useMinimumLoading from "@/hooks/useMinimumLoading";
import useReadMessages from "@/hooks/useReadMessages";
import useUsers from "@/hooks/useUsers";
import { markInboxThreadRead } from "@/libs/messages";
import { MessageThread } from "@/types/messages";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const MessagesPage = () => {
  const router = useRouter();
  const selectedUserId =
    typeof router.query.userId === "string" ? router.query.userId : undefined;
  const { data: currentUser } = useCurrentUser();
  const { data: users = [] } = useUsers();
  const { data: inboxData, isLoading: inboxLoading, mutate: mutateInbox } =
    useMessages();
  const { readThreadIds, markThreadRead } = useReadMessages();
  const [searchValue, setSearchValue] = useState("");
  const showLoading = useMinimumLoading(inboxLoading, 300);

  const threads = useMemo(
    () =>
      (inboxData?.threads || []).map((thread: MessageThread) =>
          readThreadIds[thread.user.id]
            ? { ...thread, unreadCount: 0 }
            : thread,
      ),
    [inboxData?.threads, readThreadIds],
  );

  const suggestedUsers = useMemo(
    () =>
      (users as Array<{
        id: string;
        name?: string | null;
        username?: string | null;
      }>)
        .filter((user) => user.id !== currentUser?.id)
        .filter((user) => {
          const query = searchValue.trim().toLowerCase();

          if (!query) {
            return true;
          }

          return (
            user.name?.toLowerCase().includes(query) ||
            user.username?.toLowerCase().includes(query)
          );
        })
        .slice(0, searchValue.trim() ? 6 : 4),
    [currentUser?.id, searchValue, users],
  );

  const openThread = async (userId: string) => {
    markThreadRead(userId);

    try {
      await axios.patch(`/api/messages/${userId}`);
      await mutateInbox((current) => markInboxThreadRead(current, userId), {
        revalidate: true,
      });
    } catch (error) {
      console.error("Failed to mark thread as read", error);
    }

    await router.push(
      {
        pathname: "/messages",
        query: { userId },
      },
      undefined,
      { shallow: true },
    );
  };

  const clearThread = () => {
    void router.push("/messages", undefined, { shallow: true });
  };

  if (showLoading && !inboxData) {
    return <BrandLoader compact />;
  }

  return (
    <>
      <Header label="Dee-EM" showBackArrow={Boolean(selectedUserId)} />
      <div className="grid min-h-[calc(100vh-89px)] grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside
          className={`border-r border-neutral-800 ${
            selectedUserId ? "hidden lg:block" : "block"
          }`}
        >
          <div className="border-b border-neutral-800 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              Inbox
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              Your private Glitter notes and conversations.
            </p>
            <div className="mt-4 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-3 transition focus-within:border-sky-500/40">
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Find someone to Dee-EM"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
              />
            </div>
          </div>

          {suggestedUsers.length ? (
            <div className="border-b border-neutral-800 px-5 py-4">
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-neutral-500">
                Start a conversation
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => openThread(user.id)}
                    className="rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-2 text-sm text-neutral-200 transition hover:border-sky-500/40 hover:text-white"
                  >
                    {user.name || user.username || "Unknown"}{" "}
                    <span className="text-neutral-500">
                      @ {user.username || "glitter"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="divide-y divide-neutral-800">
            {threads.length ? (
              threads.map((thread) => (
                  <button
                    key={thread.user.id}
                    type="button"
                    onClick={() => openThread(thread.user.id)}
                    className={`flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-white/[0.03] ${
                      thread.user.id === selectedUserId ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <Avatar userId={thread.user.id} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">
                            {thread.user.name || "Unknown User"}
                          </p>
                          <p className="truncate text-sm text-neutral-500">
                            @ {thread.user.username || "unknown"}
                          </p>
                        </div>
                        {thread.unreadCount > 0 ? (
                          <span className="rounded-full bg-sky-500 px-2 py-0.5 text-xs font-semibold text-white">
                            {thread.unreadCount}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 truncate text-sm text-neutral-400">
                        {thread.lastMessage.senderId === currentUser?.id ? "You: " : ""}
                        {thread.lastMessage.body}
                      </p>
                    </div>
                  </button>
                ),
              )
            ) : (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <div className="rounded-full border border-neutral-800 bg-neutral-900/70 p-4 text-sky-400">
                  <BsChatDotsFill size={22} />
                </div>
                <p className="mt-5 text-lg font-semibold text-white">
                  No Dee-EMs yet
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">
                  Open someone&apos;s profile and tap Dee-EM to start a private conversation.
                </p>
              </div>
            )}
          </div>
        </aside>

        <section
          className={`${selectedUserId ? "flex" : "hidden lg:flex"} min-h-full flex-col`}
        >
          {selectedUserId ? (
            <MessageThreadPane userId={selectedUserId} onBack={clearThread} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="rounded-full border border-neutral-800 bg-neutral-900/70 p-4 text-sky-400">
                <BsChatDotsFill size={24} />
              </div>
              <p className="mt-5 text-2xl font-semibold text-white">
                Open a Dee-EM
              </p>
              <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
                Choose a conversation from the left, or start one from someone&apos;s profile.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default MessagesPage;
