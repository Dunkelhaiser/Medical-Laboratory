import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { serviceRouter } from "./routers/service";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    service: serviceRouter,
});

export type AppRouter = typeof appRouter;
