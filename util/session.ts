import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitbubProvider from "next-auth/providers/github";

import { createNewUser, getUserByEmail } from "./action";
import { SessionInterface, UserProfile } from "@/common.type";

import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { comparePassword } from "./bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { user } = (await getUserByEmail(credentials?.email ?? "")) as {
          user: UserProfile;
        };
        if (!user) return null;
        if (
          !user.password ||
          !(await comparePassword(user.password, credentials?.password ?? ""))
        )
          return null;
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitbubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        console.log(user);
        const userExists = (await getUserByEmail(user?.email as string)) as {
          user?: UserProfile;
        };

        if (!userExists.user) {
          await createNewUser({
            email: user.email!,
            username: user.name!,
            avatarUrl: user.image!,
          });
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUserByEmail(email)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
