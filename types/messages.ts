export type MessageUser = {
  id: string;
  name?: string | null;
  username?: string | null;
};

export type MessageWithUsers = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  seenAt: string | null;
  senderId: string;
  recipientId: string;
  sender: MessageUser;
  recipient: MessageUser;
};

export type MessageThread = {
  lastMessage: MessageWithUsers;
  unreadCount: number;
  user: MessageWithUsers["sender"];
};

export type MessagesInboxResponse = {
  threads: MessageThread[];
  unreadCount: number;
};

export type MessageThreadResponse = {
  otherUser: MessageUser;
  messages: MessageWithUsers[];
};
