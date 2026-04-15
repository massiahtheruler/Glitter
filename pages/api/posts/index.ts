import { NextApiRequest, NextApiResponse } from "next";

import getRequestContent from "@/libs/getRequestContent";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { image } = req.body;
      const content = getRequestContent(req.body);

      if (!content) {
        return res.status(400).json({ error: "Post content is required" });
      }

      const post = await prisma.post.create({
        data: {
          content,
          image,
          userId: currentUser.id,
        },
        include: {
          user: true,
          comments: true,
        },
      });

      return res.status(200).json(post);
    }

    const { userId } = req.query;

    let posts;

    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          comments: true,
        },
      });
    } else {
      posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          comments: true,
        },
      });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
}
