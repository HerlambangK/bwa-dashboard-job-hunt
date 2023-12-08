import { NextAuthOptions } from "next-auth";
import { comparePassword } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { randomUUID } from "crypto";
import { error } from "console";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return null;
        }
        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }
        const isMatch = await comparePassword(
          credentials?.password!!,
          user.password
        );

        if (isMatch) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
      }
      console.log({ ...token, ...user });
      if (account) {
        token.id = user.id;
      }
      return { ...token, ...user };

      // return token;
    },
    async session({ session, token, user }) {
      // Check if user exists and has the 'emailVerified' property
      if (user && user.emailVerified) {
        // Continue with setting session.user.id and session.user.email
        session.user.id = token.sub as any;
        session.user.email = token.emailVerified as any;
        console.log("session.user.email", session.user.email);
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
