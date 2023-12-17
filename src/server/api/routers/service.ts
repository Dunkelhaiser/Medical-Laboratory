import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z as zod } from "zod";

export const serviceRouter = createTRPCRouter({
    getServices: publicProcedure.input(zod.object({ limit: zod.number().min(1).optional() })).query(({ ctx, input }) => {
        const services = ctx.db.service.findMany({
            take: input.limit,
        });
        return services;
    }),
    getService: publicProcedure.input(zod.object({ id: zod.string() })).query(({ ctx, input }) => {
        const service = ctx.db.service.findUnique({
            where: {
                id: input.id,
            },
        });
        return service;
    }),
    getComments: publicProcedure.input(zod.object({ id: zod.string() })).query(({ ctx, input }) => {
        const comments = ctx.db.comments.findMany({
            where: {
                serviceId: input.id,
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return comments;
    }),
});
