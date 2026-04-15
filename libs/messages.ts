import { MessagesInboxResponse } from "@/types/messages";

export const markInboxThreadRead = (
  inbox: MessagesInboxResponse | undefined,
  userId: string,
) => {
  if (!inbox?.threads) {
    return inbox;
  }

  const threads = inbox.threads.map((thread) =>
    thread.user.id === userId ? { ...thread, unreadCount: 0 } : thread,
  );

  return {
    ...inbox,
    threads,
    unreadCount: threads.reduce(
      (total, thread) => total + (thread.unreadCount || 0),
      0,
    ),
  };
};
