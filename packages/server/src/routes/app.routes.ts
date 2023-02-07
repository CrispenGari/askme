import { publicProcedure, router } from "../trpc/trpc";
import { helloRouter } from "./hello/hello.router";

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
