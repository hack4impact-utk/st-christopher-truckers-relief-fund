import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUserByEmail } from "@/server/api/users/queries";
import { User } from "@/types";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("You must provide an email and password to sign in");
        }

        const [user, error] = await getUserByEmail(credentials.email);

        if (error !== null) {
          throw new Error("Invalid email or password");
        }

        const doesPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!doesPasswordMatch) {
          throw new Error("Invalid email or password");
        }

        return {
          ...user,
          id: user._id as string, // next_auth requires an "id" field
          password: "", // mask password
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // the token gets the User object from the CredentialsProvider's authorize method
      // but it only gets it the first time; every time after it is undefined
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // You must pass the user we got from the token into the session object
      // The session is then used on the front end
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // The login page will parse the error query parameter passed in
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
