import "dotenv/config";
import _ from "node-env-types";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createContext } from "./context/context";
export { type AppRouter } from "./routes/app.routes";
import { appRouter } from "./routes/app.routes";
import Fastify from "fastify";
import cors from "@fastify/cors";
import ws from "@fastify/websocket";
export {
  type User,
  type Chat,
  type Message,
  type Location,
  type Settings,
} from "@prisma/client";
export { type UserOnlineType } from "./types";

_();

const PORT: any = process.env.PORT || 3001;
const HOST =
  process.env.NODE_ENV === "production"
    ? "0.0.0.0"
    : "localhost" || "127.0.0.1";

const fastify = Fastify({
  logger: false,
  ignoreTrailingSlash: true,
  maxParamLength: 5000,
});

fastify.register(cors, {
  credentials: true,
  origin: "*",
});
fastify.register(ws);
fastify.register(fastifyTRPCPlugin, {
  prefix: "/api/trpc",
  trpcOptions: { router: appRouter, createContext },
  useWSS: true,
});

fastify.listen({ port: PORT, host: HOST }, (error, address) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log(` Server is now listening on ${address}`);
});
