import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const datasourceUrl = process.env.DATABASE_URL;

  if (!datasourceUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  return new PrismaClient({
    datasourceUrl,
  });
};

const hasMessageDelegate = (client: PrismaClient | undefined) =>
  Boolean(client && "message" in client);

const client =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : hasMessageDelegate(globalThis.prisma)
      ? globalThis.prisma!
      : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
