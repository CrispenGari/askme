import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { inferAsyncReturnType } from "@trpc/server";
import Redis from "ioredis";
import EventEmitter from "events";
import { prisma } from "../prisma";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  const ee = new EventEmitter();
  const redis = new Redis();
  return {
    req,
    res,
    ee,
    prisma,
    redis,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
