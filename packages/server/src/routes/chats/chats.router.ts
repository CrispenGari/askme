import { z } from "zod";
import { initializeChatSchema } from "../../schema/chats.schema";
import { publicProcedure, router } from "../../trpc/trpc";
import { verifyJwt } from "../../utils";

export const chatsRouter = router({
  initializeChat: publicProcedure
    .input(initializeChatSchema)
    .mutation(async ({ ctx: { prisma, req }, input: { friendId } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const me = await prisma.user.findFirst({ where: { id } });
        const friend = await prisma.user.findFirst({ where: { id: friendId } });
        if (!!!me)
          return {
            error: {
              message: "Unauthorized",
              field: "user",
            },
          };
        if (!!!friend)
          return {
            error: {
              message: "Unable to start a new chat",
              field: "friend",
            },
          };
        const chat = await prisma.chat.create({
          data: {
            users: { create: [{ userId: me.id }, { userId: friend.id }] },
          },
        });
        return chat;
      } catch (error) {
        return {
          error: {
            message: "Unable to start a new chat, server error.",
            field: "server",
          },
        };
      }
    }),

  allChats: publicProcedure.query(async ({ ctx: { prisma, req } }) => {
    try {
      const jwt = req.headers?.authorization?.split(/\s/)[1];
      const { id } = await verifyJwt(jwt as string);
      const me = await prisma.user.findFirst({ where: { id } });
      if (!!!me)
        return {
          error: {
            message: "Unauthorized",
            field: "user",
          },
        };
      const chats = await prisma.chat.findMany({
        where: {
          users: {
            some: {
              userId: me.id,
            },
          },
        },
      });
      return chats;
    } catch (error) {
      return {
        error: {
          message: "Unable to start a new chat, server error.",
          field: "server",
        },
      };
    }
  }),
});
