import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrpyt from "bcrypt";
import { db } from "@/server/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign_in",
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
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                };
            }
            return token;
        },
        async session({ session, token }: any) {
            // eslint-disable-next-line no-param-reassign
            session.user.id = token.id;
            // eslint-disable-next-line no-param-reassign
            session.user.username = token.username;
            return session;
        },
    },
};

export const getServerAuthSession = () => getServerSession(authOptions);
