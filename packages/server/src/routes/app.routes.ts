import { router } from "../trpc/trpc";
import { helloRouter } from "./hello/hello.router";
import { userRouter } from "./user/user.router";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
