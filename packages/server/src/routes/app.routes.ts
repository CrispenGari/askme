import { router } from "../trpc/trpc";
import { chatsRouter } from "./chats/chats.router";
import { helloRouter } from "./hello/hello.router";
import { messagesRouter } from "./messages/messages.router";
import { userRouter } from "./user/user.router";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  messages: messagesRouter,
  chats: chatsRouter,
});

export type AppRouter = typeof appRouter;
