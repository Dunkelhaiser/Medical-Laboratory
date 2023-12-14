import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z as zod } from "zod";

export const serviceRouter = createTRPCRouter({
    getServices: publicProcedure.input(zod.object({ limit: zod.number().min(1) })).query(({ ctx, input }) => {
        const services = ctx.db.service.findMany({
            take: input.limit,
        });
        return services;
    }),
});
