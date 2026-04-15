import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
  const hasNextAuthSecret = Boolean(process.env.NEXTAUTH_SECRET);
  const hasNextAuthJwtSecret = Boolean(process.env.NEXTAUTH_JWT_SECRET);
  const nextAuthUrl = process.env.NEXTAUTH_URL || null;

  try {
    const { default: prisma } = await import("@/libs/prismadb");

    const userCount = await prisma.user.count();

    return res.status(200).json({
      ok: true,
      hasDatabaseUrl,
      hasNextAuthSecret,
      hasNextAuthJwtSecret,
      nextAuthUrl,
      userCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("debug-db failed", error);

    return res.status(500).json({
      ok: false,
      hasDatabaseUrl,
      hasNextAuthSecret,
      hasNextAuthJwtSecret,
      nextAuthUrl,
      error: message,
    });
  }
}
