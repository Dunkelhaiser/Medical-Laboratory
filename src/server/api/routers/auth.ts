import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { schema } from "@models/SignUp";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
    create: publicProcedure.input(schema).mutation(async ({ ctx, input }) => {
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

        return ctx.db.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                phone: input.phone,
                password: hashedPassword,
            },
        });
    }),
});
