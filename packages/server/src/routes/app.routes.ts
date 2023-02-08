import { router } from "../trpc/trpc";
import { helloRouter } from "./hello/hello.router";
import { messagesRouter } from "./messages/messages.router";
import { userRouter } from "./user/user.router";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;
