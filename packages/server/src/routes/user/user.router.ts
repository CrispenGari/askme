import { __code__exp__, __code__prefix__ } from "../../constants";
import {
  confirmSchema,
  meSchema,
  profileSchema,
  registerSchema,
  resendVerificationCodeSchema,
} from "../../schema/user.schema";
import { publicProcedure, router } from "../../trpc/trpc";
import { sendVerificationCode, signJwt, verifyJwt } from "../../utils";
import * as trpc from "@trpc/server";

export const userRouter = router({
  me: publicProcedure.query(async ({ ctx: { prisma, req } }) => {
    console.log(req.headers);
    try {
      const jwt = req.headers?.authorization?.split(/\s/)[1];
      const { phoneNumber } = await verifyJwt(jwt as string);
      const user = await prisma.user.findFirst({ where: { phoneNumber } });
      return {
        me: user,
      };
    } catch (error) {
      return {
        me: null,
      };
    }
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx: { redis, prisma }, input: { phoneNumber } }) => {
      /**
       * if the user phone number is taken we:
       * - update the user
       */
      try {
        const code: string = Math.random().toString().slice(2, 8);
        const user = await prisma.user.findFirst({
          where: {
            phoneNumber,
          },
        });
        const _user = !!user
          ? await prisma.user.update({
              where: {
                phoneNumber,
              },
              data: {
                isOnline: false,
                isLoggedIn: false,
              },
            })
          : await prisma.user.create({
              data: {
                phoneNumber,
              },
            });
        const value = JSON.stringify({ phoneNumber: _user.phoneNumber, code });
        await redis.setex(__code__prefix__ + phoneNumber, __code__exp__, value);
        await sendVerificationCode(_user.phoneNumber, code);
        return {
          user: user ?? _user,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong on the server.",
        });
      }
    }),

  resendVerificationCode: publicProcedure
    .input(resendVerificationCodeSchema)
    .mutation(async ({ ctx: { prisma, redis }, input: { phoneNumber } }) => {
      try {
        await redis.del(__code__prefix__ + phoneNumber);
        const code: string = Math.random().toString().slice(2, 8);
        const user = await prisma.user.findFirst({
          where: {
            phoneNumber,
          },
        });
        if (!!!user) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Invalid phone number.",
          });
        }
        await prisma.user.update({
          where: {
            phoneNumber,
          },
          data: {
            isOnline: false,
            isLoggedIn: false,
          },
        });
        const value = JSON.stringify({ phoneNumber: user.phoneNumber, code });
        await redis.setex(__code__prefix__ + phoneNumber, __code__exp__, value);
        await sendVerificationCode(user.phoneNumber, code);
        return {
          user,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong on the server.",
        });
      }
    }),
  confirm: publicProcedure
    .input(confirmSchema)
    .mutation(
      async ({ ctx: { prisma, redis }, input: { code, phoneNumber } }) => {
        try {
          const user = await prisma.user.findFirst({
            where: {
              phoneNumber,
            },
          });
          if (!!!user) {
            throw new trpc.TRPCError({
              code: "FORBIDDEN",
              message: "The phone number is invalid.",
            });
          }
          const value = await redis.get(__code__prefix__ + user.phoneNumber);

          if (!!!value) {
            await redis.del(__code__prefix__ + phoneNumber);
            throw new trpc.TRPCError({
              code: "FORBIDDEN",
              message: "Verification code has expired.",
            });
          }
          const payload = JSON.parse(value) as {
            phoneNumber: string;
            code: string;
          };

          if (payload.phoneNumber !== user.phoneNumber) {
            await redis.del(__code__prefix__ + phoneNumber);
            throw new trpc.TRPCError({
              code: "FORBIDDEN",
              message: "Invalid phone number.",
            });
          }

          if (payload.code !== code) {
            await redis.del(__code__prefix__ + phoneNumber);
            throw new trpc.TRPCError({
              code: "FORBIDDEN",
              message: "Invalid verification code.",
            });
          }

          await redis.del(__code__prefix__ + phoneNumber);
          return {
            user,
          };
        } catch (error) {
          console.log({ error });
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong on the server.",
          });
        }
      }
    ),

  profile: publicProcedure
    .input(profileSchema)
    .mutation(
      async ({ ctx: { prisma }, input: { nickname, phoneNumber, avatar } }) => {
        try {
          const user = await prisma.user.findFirst({
            where: {
              phoneNumber,
            },
          });
          if (!!!user) {
            throw new trpc.TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Invalid phone number.",
            });
          }
          const _user = await prisma.user.update({
            where: {
              phoneNumber,
            },
            data: {
              isOnline: true,
              isLoggedIn: true,
              nickname,
              avatar,
            },
          });

          const jwt: string = await signJwt(_user);
          return {
            user: _user,
            jwt,
          };
        } catch (error) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong on the server.",
          });
        }
      }
    ),
});
