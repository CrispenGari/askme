import { router } from "../trpc/trpc";
import { chatsRouter } from "./chats/chats.router";
import { helloRouter } from "./hello/hello.router";
import { messagesRouter } from "./messages/messages.router";
import { settingsRouter } from "./settings/settings.router";
import { spacesRouter } from "./spaces/spaces.router";
import { userRouter } from "./user/user.router";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  messages: messagesRouter,
  chats: chatsRouter,
  spaces: spacesRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
