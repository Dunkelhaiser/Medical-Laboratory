import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sendNotice } from "@/server/mail";
import { TRPCError } from "@trpc/server";
import { z as zod } from "zod";

export const cartRouter = createTRPCRouter({
    addToCart: protectedProcedure.input(zod.string().min(25).max(25)).mutation(async ({ ctx, input }) => {
        const service = await ctx.db.service.findUnique({
            where: {
                id: input,
            },
        });

        if (!service) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Service not found",
            });
        }

        const userCart = await ctx.db.cart.findFirst({
            where: {
                userId: ctx.session.user.id,
            },
        });

        if (!userCart) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Cart not found",
            });
        }

        const addedItem = await ctx.db.service.update({
            where: {
                id: input,
            },
            data: {
                cart: {
                    connect: {
                        id: userCart.id,
                    },
                },
            },
        });

        return addedItem;
    }),
    removeFromCart: protectedProcedure.input(zod.string().min(25).max(25)).mutation(async ({ ctx, input }) => {
        const service = await ctx.db.service.findUnique({
            where: {
                id: input,
            },
        });

        if (!service) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Service not found",
            });
        }

        const userCart = await ctx.db.cart.findFirst({
            where: {
                userId: ctx.session.user.id,
            },
        });

        if (!userCart) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Cart not found",
            });
        }

        const removedItem = await ctx.db.service.update({
            where: {
                id: input,
            },
            data: {
                cart: {
                    disconnect: {
                        id: userCart.id,
                    },
                },
            },
        });

        return removedItem;
    }),
    getCart: protectedProcedure.query(async ({ ctx }) => {
        const userCart = await ctx.db.cart.findFirst({
            where: {
                userId: ctx.session.user.id,
            },
            include: {
                services: true,
            },
        });

        if (!userCart) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Cart not found",
            });
        }

        return userCart;
    }),
    findInCart: protectedProcedure.input(zod.string().min(25).max(25)).query(async ({ ctx, input }) => {
        const service = await ctx.db.service.findUnique({
            where: {
                id: input,
            },
        });

        if (!service) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Service not found",
            });
        }

        const userCart = await ctx.db.cart.findFirst({
            where: {
                userId: ctx.session.user.id,
            },
        });

        if (!userCart) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Cart not found",
            });
        }

        const foundItem = await ctx.db.service.findFirst({
            where: {
                id: input,
                cart: {
                    some: {
                        id: userCart.id,
                    },
                },
            },
        });

        return foundItem;
    }),
    purchase: protectedProcedure.mutation(async ({ ctx }) => {
        const userCart = await ctx.db.cart.findFirst({
            where: {
                userId: ctx.session.user.id,
            },
            include: {
                services: true,
            },
        });

        if (!userCart) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Cart not found",
            });
        }

        const purchasedServices = await ctx.db.cart.delete({
            where: {
                id: userCart.id,
            },
        });

        await sendNotice(ctx.session.user.email!);

        await ctx.db.cart.create({
            data: {
                userId: ctx.session.user.id,
            },
        });

        return purchasedServices;
    }),
});
