import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
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
    const {
      name,
      username,
      bio,
      email,
      profileImage,
      coverImage,
      currentPassword,
      newPassword,
    } = req.body;

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = typeof email === "string" ? email.trim() : currentUser.email;
    const currentUserEmail = currentUser.email || "";
    const isEmailChanged = Boolean(trimmedEmail && trimmedEmail !== currentUserEmail);
    const isPasswordChangeRequested = Boolean(newPassword);

    if (trimmedUsername.length < 3) {
      throw new Error("Username must be at least 3 characters");
    }

    if (trimmedEmail && !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      throw new Error("Enter a valid email address");
    }

    if (isEmailChanged || isPasswordChangeRequested) {
      if (!currentPassword) {
        throw new Error("Current password is required for security changes");
      }

      if (!currentUser.hashedPassword) {
        throw new Error("Password changes are not available for this account");
      }

      const isCorrectPassword = await bcrypt.compare(
        currentPassword,
        currentUser.hashedPassword,
      );

      if (!isCorrectPassword) {
        throw new Error("Current password is incorrect");
      }
    }

    if (isPasswordChangeRequested && newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters");
    }

    const existingEmailOwner =
      trimmedEmail && trimmedEmail !== currentUserEmail
        ? await prisma.user.findUnique({ where: { email: trimmedEmail } })
        : null;

    if (existingEmailOwner && existingEmailOwner.id !== currentUser.id) {
      throw new Error("That email is already in use");
    }

    const existingUsernameOwner =
      trimmedUsername !== currentUser.username
        ? await prisma.user.findUnique({ where: { username: trimmedUsername } })
        : null;

    if (existingUsernameOwner && existingUsernameOwner.id !== currentUser.id) {
      throw new Error("That username is already taken");
    }

    const hashedPassword = isPasswordChangeRequested
      ? await bcrypt.hash(newPassword, 12)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: trimmedName,
        username: trimmedUsername,
        bio,
        email: trimmedEmail,
        profileImage,
        coverImage,
        ...(hashedPassword ? { hashedPassword } : {}),
      },
    });

    res.status(200).json({
      user: updatedUser,
      requiresReauth: isEmailChanged || isPasswordChangeRequested,
    });
    return;
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({ error: message });
    return;
  }
}
