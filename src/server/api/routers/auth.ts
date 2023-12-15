import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { schema } from "@models/SignUp";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { sendVerification } from "@/server/mail";

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

        await ctx.db.cart.create({
            data: {
                userId: user.id,
            },
        });

        const token = await ctx.db.verificationToken.create({
            data: {
                userId: user.id,
                token: `${randomUUID()}${randomUUID()}${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            },
        });

        await sendVerification(user.email, token.token);

        return user;
    }),
});
