import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { schema } from "@models/SignUp";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { env } from "@/env";
import { randomUUID } from "crypto";

const resend = new Resend(env.RESEND_API_KEY);

const sendEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Labix - Confirm your email`,
        html: `Click <a href="${env.NEXTAUTH_URL}/activate/${token}">here</a> to verify your account`,
    });
};

export const authRouter = createTRPCRouter({
    signUp: publicProcedure.input(schema).mutation(async ({ ctx, input }) => {
        const existingEmail = await ctx.db.user.findUnique({
            where: { email: input.email },
        });
        if (existingEmail) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "Email already taken",
            });
        }

        const existingPhone = await ctx.db.user.findUnique({
            where: { phone: input.phone },
        });
        if (existingPhone) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "Phone number already taken",
            });
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const user = await ctx.db.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                phone: input.phone,
                password: hashedPassword,
            },
        });

        const token = await ctx.db.verificationToken.create({
            data: {
                userId: user.id,
                token: `${randomUUID()}${randomUUID()}${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            },
        });

        await sendEmail(user.email, token.token);

        return user;
    }),
});
