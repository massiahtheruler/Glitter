import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = req.body;
    const trimmedEmail = email?.trim();
    const trimmedUsername = username?.trim();
    const trimmedName = name?.trim();

    if (!trimmedEmail) {
      return res.status(400).json({ field: "email", message: "Email is required." });
    }

    if (!trimmedUsername) {
      return res.status(400).json({ field: "username", message: "Username is required." });
    }

    if (!trimmedName) {
      return res.status(400).json({ field: "name", message: "Name is required." });
    }

    if (!password) {
      return res.status(400).json({ field: "password", message: "Password is required." });
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      return res.status(400).json({ field: "email", message: "Enter a valid email address." });
    }

    if (password.length < 6) {
      return res.status(400).json({
        field: "password",
        message: "Password must be at least 6 characters.",
      });
    }

    if (trimmedUsername.length < 3) {
      return res.status(400).json({
        field: "username",
        message: "Username must be at least 3 characters.",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: trimmedEmail },
          { username: trimmedUsername },
        ],
      },
    });

    if (existingUser?.email === trimmedEmail) {
      return res.status(409).json({ field: "email", message: "That email is already in use." });
    }

    if (existingUser?.username === trimmedUsername) {
      return res.status(409).json({ field: "username", message: "That username is already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: trimmedEmail,
        username: trimmedUsername,
        name: trimmedName,
        hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({
        field: "email",
        message: "An account with that email or username already exists.",
      });
    }

    return res.status(500).json({ message: "Something went wrong while creating your account." });
  }
}
