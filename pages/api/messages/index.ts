import { NextApiRequest, NextApiResponse } from "next";

import getRequestContent from "@/libs/getRequestContent";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

const isValidObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { currentUser } = await serverAuth(req, res);

    if (req.method === "GET") {
      const messages = await prisma.message.findMany({
        where: {
          OR: [{ senderId: currentUser.id }, { recipientId: currentUser.id }],
        },
        include: {
          sender: true,
          recipient: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const threadMap = new Map<
        string,
        {
          lastMessage: (typeof messages)[number];
          unreadCount: number;
          user: (typeof messages)[number]["sender"];
        }
      >();

      messages.forEach((message) => {
        const otherUser =
          message.senderId === currentUser.id
            ? message.recipient
            : message.sender;

        if (!otherUser?.id) {
          return;
        }

        const key = otherUser.id;
        const existing = threadMap.get(key);
        const isUnread =
          message.recipientId === currentUser.id && message.seenAt === null;

        if (!existing) {
          threadMap.set(key, {
            lastMessage: message,
            unreadCount: isUnread ? 1 : 0,
            user: otherUser,
          });
          return;
        }

        if (isUnread) {
          existing.unreadCount += 1;
        }
      });

      return res.status(200).json({
        threads: Array.from(threadMap.values()),
        unreadCount: Array.from(threadMap.values()).reduce(
          (total, thread) => total + thread.unreadCount,
          0,
        ),
      });
    }

    if (req.method === "POST") {
      const body = getRequestContent(req.body);
      const recipientId =
        req.body && typeof req.body === "object" && "recipientId" in req.body
          ? req.body.recipientId
          : undefined;

      if (typeof recipientId !== "string") {
        return res.status(400).json({ error: "Recipient is required" });
      }

      if (!isValidObjectId(recipientId)) {
        return res.status(400).json({ error: "Recipient is invalid" });
      }

      if (!body?.trim()) {
        return res.status(400).json({ error: "Message content is required" });
      }

      if (recipientId === currentUser.id) {
        return res.status(400).json({ error: "You can’t message yourself" });
      }

      const recipient = await prisma.user.findUnique({
        where: {
          id: recipientId,
        },
      });

      if (!recipient) {
        return res.status(404).json({ error: "Recipient not found" });
      }

      const message = await prisma.message.create({
        data: {
          body: body.trim(),
          senderId: currentUser.id,
          recipientId,
        },
        include: {
          sender: true,
          recipient: true,
        },
      });

      return res.status(200).json(message);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Internal server error";

    return res.status(500).json({ error: message });
  }
}
