import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { serviceRouter } from "./routers/service";
import { cartRouter } from "./routers/cart";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    service: serviceRouter,
    cart: cartRouter,
});

export type AppRouter = typeof appRouter;
