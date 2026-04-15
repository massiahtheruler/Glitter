import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { currentUser } = await serverAuth(req, res);
    const { userId } = req.query;

    if (typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const otherUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!otherUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.method === "PATCH") {
      await prisma.message.updateMany({
        where: {
          senderId: userId,
          recipientId: currentUser.id,
          seenAt: null,
        },
        data: {
          seenAt: new Date(),
        },
      });

      return res.status(200).json({ success: true });
    }

    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUser.id,
            recipientId: userId,
          },
          {
            senderId: userId,
            recipientId: currentUser.id,
          },
        ],
      },
      include: {
        sender: true,
        recipient: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      otherUser,
      messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
