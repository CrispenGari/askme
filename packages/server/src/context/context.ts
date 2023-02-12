import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { inferAsyncReturnType } from "@trpc/server";
import Redis from "ioredis";
import { prisma } from "../prisma";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  const redis = new Redis();

  return {
    req,
    res,
    prisma,
    redis,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
