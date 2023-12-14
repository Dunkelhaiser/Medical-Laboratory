import { testRouter } from "@/server/api/routers/test";
import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
    test: testRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
