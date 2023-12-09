import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const testRouter = createTRPCRouter({
    helloWorld: publicProcedure.query(() => {
        return "Hello World!";
    }),
});
