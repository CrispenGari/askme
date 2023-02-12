import { z } from "zod";
import { initializeChatSchema } from "../../schema/chats.schema";
import { publicProcedure, router } from "../../trpc/trpc";
import { verifyJwt } from "../../utils";

export const chatsRouter = router({
  countUnOpenedChats: publicProcedure.query(
    async ({ ctx: { prisma, req } }) => {
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
          include: {
            messages: {
              select: {
                read: true,
                userId: true,
              },
            },
          },
        });
        const messages = chats.flatMap((m) => m.messages);
        const _ch = messages
          .filter((msg) => msg.userId !== me.id)
          .filter((m) => m.read === false);
        return { chats: _ch.length };
      } catch (error) {
        return {
          error: {
            message: "Unable to start a new chat, server error.",
            field: "server",
          },
        };
      }
    }
  ),

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

        const chatId: string = [me.id, friend.id]
          .sort((a, b) => a.localeCompare(b))
          .join("@");

        const chat = await prisma.chat.findFirst({
          where: {
            userToUserChatId: chatId,
          },
          include: {
            users: {
              select: {
                user: true,
              },
            },
            messages: true,
          },
        });
        if (!!chat) return { chat };
        const _chat = await prisma.chat.create({
          data: {
            userToUserChatId: chatId,
            users: {
              create: [
                {
                  user: {
                    connect: {
                      id: me.id,
                    },
                  },
                },
                {
                  user: {
                    connect: {
                      id: friend.id,
                    },
                  },
                },
              ],
            },
          },
          include: {
            users: {
              select: {
                user: true,
              },
            },
            messages: {
              select: {
                sender: true,
              },
            },
          },
        });
        return { chat: _chat };
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
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          messages: {
            select: {
              sender: true,
              createdAt: true,
              updatedAt: true,
              read: true,
              message: true,
              id: true,
              chatId: true,
              userId: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
          users: {
            select: {
              user: true,
            },
            where: {
              NOT: {
                userId: me.id,
              },
            },
          },
        },
      });

      return { chats };
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
