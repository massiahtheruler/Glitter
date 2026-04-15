import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import createNotification from "@/libs/createNotification";
import prisma from "@/libs/prismadb";
import getRequestContent from "@/libs/getRequestContent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { postId } = req.body;
    const commentContent = getRequestContent(req.body);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!commentContent) {
      throw new Error("Comment content is required");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: {
        content: commentContent,
        userId: currentUser.id,
        postId,
      },
    });

    await createNotification({
      body: "replied to your post",
      commentId: comment.id,
      fromUserId: currentUser.id,
      postId,
      type: "comment",
      userId: post.userId,
    });

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
