export type UserSummary = {
  id: string;
  name?: string | null;
  username?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
  bio?: string | null;
  createdAt?: string | Date;
  followingIds?: string[];
  hasNotifications?: boolean;
  followersCount?: number;
};

export type CommentRecord = {
  id: string;
  content: string;
  createdAt?: string | Date;
  user?: UserSummary;
};

export type PostRecord = {
  id: string;
  content: string;
  image?: string | null;
  createdAt?: string | Date;
  likedIds?: string[];
  user: UserSummary;
  comments?: CommentRecord[];
};

export type NotificationRecord = {
  id: string;
  body: string;
  createdAt?: string | Date;
  fromUser?: UserSummary;
};
