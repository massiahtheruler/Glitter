import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";

import prisma from "@/libs/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const email = credentials.email.trim();
        const password = credentials.password;

        if (!email || !password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          }
        });

        if (!user || !user.hashedPassword) {
         throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      }
    })
  ],
 debug: process.env.NODE_ENV === "development",
 session: {
    strategy: "jwt"
  },
  jwt: {
  secret: process.env.NEXTAUTH_JWT_SECRET
},
secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
