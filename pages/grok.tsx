import Header from "@/components/Header";
import BrokMark from "@/components/BrokMark";
import Image from "next/image";
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BiUpArrow } from "react-icons/bi";

type ChatMessage = {
  id: string;
  imageUrl?: string;
  role: "assistant" | "user";
  text: string;
};

const BROK_UID = "8UM7MkrjouNWjCWFOCERAmZMECB2";
const CHAT_STORAGE_KEY = "glitter-brok-history";

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Welcome to Brok. What can I do for you?",
  },
];

const suggestedPrompts = [
  "Generate an image of a futuristic Glitter campaign poster",
  "Give me 5 homepage redesign ideas for Glitter",
  "Write a polished About section for my portfolio",
  "Help me plan a freelance landing page",
];

const normalizePrompt = (message: string) => {
  const trimmed = message.trim();

  if (!trimmed) {
    return trimmed;
  }

  const lower = trimmed.toLowerCase();
  const imagePrefixes = [
    "make a picture of",
    "make a picture",
    "make an image of",
    "make an image",
    "generate a picture of",
    "generate a picture",
    "generate an image of",
    "generate an image",
    "draw",
    "create a picture of",
    "create a picture",
    "create an image of",
    "create an image",
  ];

  const matchedPrefix = imagePrefixes.find((prefix) =>
    lower.startsWith(prefix),
  );

  if (!matchedPrefix) {
    return trimmed;
  }

  const remainder = trimmed.slice(matchedPrefix.length).trim();

  return remainder
    ? `Generate an image of ${remainder}`
    : "Generate an image based on the idea I described.";
};

const renderInlineText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

const renderFormattedText = (text: string) => {
  const lines = text.split("\n").map((line) => line.trimEnd());
  const blocks: ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (key: string) => {
    if (currentList.length === 0) {
      return;
    }

    blocks.push(
      <ul
        key={key}
        className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-100"
      >
        {currentList.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInlineText(item)}</li>
        ))}
      </ul>,
    );
    currentList = [];
  };

  lines.forEach((line, index) => {
    if (!line.trim()) {
      flushList(`list-${index}`);
      return;
    }

    if (line.startsWith("### ")) {
      flushList(`list-${index}`);
      blocks.push(
        <h3
          key={`heading-${index}`}
          className="mt-5 text-base font-semibold text-white"
        >
          {line.replace(/^###\s+/, "")}
        </h3>,
      );
      return;
    }

    const listMatch = line.match(/^[-*]\s+(.+)/) || line.match(/^\d+\.\s+(.+)/);

    if (listMatch) {
      currentList.push(listMatch[1]);
      return;
    }

    flushList(`list-${index}`);
    blocks.push(
      <p
        key={`paragraph-${index}`}
        className="text-sm leading-7 text-neutral-100"
      >
        {renderInlineText(line)}
      </p>,
    );
  });

  flushList("list-final");

  return blocks;
};

const GrokPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = window.localStorage.getItem(CHAT_STORAGE_KEY);

    if (!savedMessages) {
      return;
    }

    try {
      const parsedMessages = JSON.parse(savedMessages) as ChatMessage[];

      if (parsedMessages.length > 0) {
        setMessages(parsedMessages);
      }
    } catch {
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );
  const isEmptyState =
    messages.length === 1 &&
    messages[0]?.id === "welcome" &&
    messages[0]?.text === initialMessages[0].text;

  const handleMessage = async () => {
    const trimmed = input.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const normalizedMessage = normalizePrompt(trimmed);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://backend.fesinstitute.com/api/public/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: normalizedMessage, uid: BROK_UID }),
        },
      );

      const { reply, imageUrl } = await response.json();

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: reply || "I couldn't come up with a reply just now.",
          imageUrl,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          text: "Something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleMessage();
  };

  const onKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleMessage();
    }
  };

  const applySuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const clearConversation = () => {
    setMessages(initialMessages);
    window.localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  return (
    <>
      <Header label="Brok" showBackArrow />
      <div className="bg-neutral-950 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-[860px] flex-col px-4 pb-32 pt-6 sm:px-6">
          <div className="sticky top-0 z-10 mb-6 rounded-[28px] border border-neutral-800/80 bg-neutral-950/85 px-5 py-4 backdrop-blur">
            <div className="flex items-center gap-4">
              <BrokMark size={44} className="object-contain" />
              <div>
                <p className="text-lg font-semibold text-white">Brok</p>
                <p className="text-sm text-neutral-400">
                  Welcome to Brok. What can I do for you?
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {isEmptyState ? (
              <div className="rounded-[28px] border border-neutral-800 bg-neutral-900/70 p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-sky-400">
                  Start here
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Ask Brok for ideas, writing help, visuals, or quick creative
                  direction.
                </h2>
                <p className="mt-3 max-w-[560px] text-sm leading-7 text-neutral-400">
                  Try a suggested prompt below, or type your own. Brok can help
                  with copy, concepts, planning, and some image generation
                  requests.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => applySuggestedPrompt(prompt)}
                      className="rounded-full border border-neutral-700 bg-neutral-950 px-4 py-2 text-left text-sm text-neutral-200 transition hover:border-sky-500/40 hover:bg-neutral-900 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={clearConversation}
                  className="text-xs uppercase tracking-[0.2em] text-neutral-500 transition hover:text-neutral-300"
                >
                  Clear chat
                </button>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={[
                    "max-w-[min(100%,680px)] rounded-[28px] px-5 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
                    message.role === "user"
                      ? "bg-sky-500 text-white"
                      : "bg-neutral-900 text-white",
                  ].join(" ")}
                >
                  {message.role === "assistant" ? (
                    <div className="space-y-3">
                      {renderFormattedText(message.text)}
                    </div>
                  ) : (
                    <p className="text-sm leading-7">{message.text}</p>
                  )}

                  {message.imageUrl ? (
                    <Image
                      src={message.imageUrl}
                      alt="Brok response"
                      width={320}
                      height={320}
                      unoptimized
                      className="mt-4 max-h-[320px] max-w-full rounded-2xl object-cover"
                    />
                  ) : null}
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-[28px] bg-neutral-900 px-5 py-4 text-sm text-neutral-400">
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.3s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.15s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-500" />
                </div>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            className="fixed bottom-100 left-1/2 z-20 w-[calc(100%-2rem)] max-w-210 -translate-x-1/2"
          >
            <div className="flex items-end gap-3 rounded-[32px] border border-neutral-800 bg-neutral-900/95 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask Brok anything..."
                rows={1}
                className="max-h-40 min-h-[52px] flex-1 resize-none bg-transparent px-2 py-3 text-base text-white outline-none placeholder:text-neutral-500"
              />
              <button
                type="submit"
                disabled={!canSend}
                className={[
                  "flex h-12 w-12 items-center justify-center rounded-full transition",
                  canSend
                    ? "bg-white text-black hover:scale-[1.03] hover:bg-neutral-200"
                    : "cursor-not-allowed bg-neutral-800 text-neutral-500",
                ].join(" ")}
                aria-label="Send message"
              >
                <BiUpArrow size={22} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GrokPage;
