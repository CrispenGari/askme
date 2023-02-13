import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import { Events } from "../../constants";
import {
  initializeChatSchema,
  onUserTypingSchema,
  userTypingSchema,
} from "../../schema/chats.schema";
import { publicProcedure, router } from "../../trpc/trpc";
import { verifyJwt } from "../../utils";

const ee = new EventEmitter({
  captureRejections: true,
});

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
              include: {
                user: {
                  include: {
                    location: true,
                    settings: true,
                  },
                },
              },
            },
            messages: {
              include: {
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

  userTyping: publicProcedure
    .input(userTypingSchema)
    .mutation(async ({ input: { chatId, typing, userId } }) => {
      ee.emit(Events.ON_USER_TYPING, { chatId, typing, userId } as {
        chatId: string;
        userId: string;
        typing: boolean;
      });
    }),
  onUserTyping: publicProcedure
    .input(onUserTypingSchema)
    .subscription(async ({ input: { chatId: id, userId: uid } }) => {
      return observable<{ typing: boolean }>((emit) => {
        const handler = ({
          chatId,
          userId,
          typing,
        }: {
          chatId: string;
          userId: string;
          typing: boolean;
        }) => {
          if (chatId === id && userId !== uid) {
            emit.next({
              typing,
            });
          }
        };
        ee.on(Events.ON_USER_TYPING, handler);
        return () => {
          ee.off(Events.ON_USER_TYPING, handler);
        };
      });
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
            include: {
              user: {
                include: {
                  location: true,
                  settings: true,
                },
              },
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
