import prisma from "@/libs/prismadb";

type CreateNotificationInput = {
  body: string;
  commentId?: string;
  fromUserId: string;
  postId?: string;
  type: string;
  userId: string;
};

const createNotification = async ({
  body,
  commentId,
  fromUserId,
  postId,
  type,
  userId,
}: CreateNotificationInput) => {
  if (userId === fromUserId) {
    return null;
  }

  const notification = await prisma.notification.create({
    data: {
      body,
      commentId,
      fromUserId,
      postId,
      type,
      userId,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hasNotifications: true,
    },
  });

  return notification;
};

export default createNotification;
