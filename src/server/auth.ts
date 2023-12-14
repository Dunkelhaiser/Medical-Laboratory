import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrpyt from "bcrypt";
import { db } from "@/server/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/sign_in",
    },
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error("Invalid credentials");

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) throw new Error("Invalid credentials");

                const passwordValid = await bcrpyt.compare(credentials.password, user.password);
                if (!passwordValid) throw new Error("Invalid credentials");

                if (!user.emailVerified) throw new Error("Email is not verified");

                return user;
            },
        }),
    ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
