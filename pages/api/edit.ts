import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    res.status(200).json(updatedUser);
    return;
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({ error: message });
    return;
  }
}
