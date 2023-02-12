import { observable } from "@trpc/server/observable";
import { Events } from "../../constants";
import { publicProcedure, router } from "../../trpc/trpc";

import {
  sendMessageSchema,
  onNewMessageSchema,
  chatMessagesSchema,
  onNewChatMessageSchema,
  onMarkAsReadSchema,
  openMessagesSchema,
  countUnOpenedMessagesSchema,
  onReadMessagesSchema,
} from "../../schema/messages.schema";
import EventEmitter from "events";
import { verifyJwt } from "../../utils";
import { ChatsOnUsers, Message, User } from "@prisma/client";
import { MessageType } from "../../types";

const ee = new EventEmitter({
  captureRejections: true,
});
export const messagesRouter = router({
  countUnOpenedMessages: publicProcedure
    .input(countUnOpenedMessagesSchema)
    .query(async ({ ctx: { prisma, req }, input: { chatId } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const user = await prisma.user.findFirst({ where: { id } });
        const chat = await prisma.chat.findFirst({
          where: {
            id: chatId,
          },
          select: {
            messages: {
              select: {
                read: true,
              },
            },
          },
        });
        if (!!!user || !!!chat)
          return {
            error: {
              field: "user|chat",
              message: "failed query chat and user.",
            },
          };

        return { chats: chat.messages.filter((msg) => !msg.read).length };
      } catch (error) {
        return {
          error: {
            message: "Unable to start a new chat, server error.",
            field: "server",
          },
        };
      }
    }),
  openMessages: publicProcedure
    .input(openMessagesSchema)
    .mutation(async ({ input: { chatId }, ctx: { req, prisma } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const user = await prisma.user.findFirst({ where: { id } });
        const chat = await prisma.chat.findFirst({
          where: {
            id: chatId,
          },
        });
        if (!!!user || !!!chat)
          return {
            error: {
              field: "user|chat",
              message: "failed query chat and user.",
            },
          };
        await prisma.message.updateMany({
          where: {
            chatId: chat.id,
            AND: {
              NOT: {
                userId: user.id,
              },
            },
          },
          data: {
            read: true,
          },
        });
        const messages = await prisma.message.findMany({
          where: {
            chatId: chat.id,
          },
          include: {
            sender: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
        ee.emit(Events.ON_READ_MESSAGES, messages);
        return { messages };
      } catch (error) {
        return {
          error: {
            field: "server",
            message: "something went wrong on the server.",
          },
        };
      }
    }),
  chatMessages: publicProcedure
    .input(chatMessagesSchema)
    .query(async ({ input: { chatId }, ctx: { req, prisma } }) => {
      try {
        const jwt = req.headers?.authorization?.split(/\s/)[1];
        const { id } = await verifyJwt(jwt as string);
        const user = await prisma.user.findFirst({ where: { id } });
        const chat = await prisma.chat.findFirst({ where: { id: chatId } });
        if (!!!user || !!!chat) return [];
        const messages = await prisma.message.findMany({
          where: {
            chatId: chat.id,
          },
          include: {
            sender: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
        return messages;
      } catch (error) {
        return [];
      }
    }),
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(
      async ({ input: { message, senderId, chatId }, ctx: { prisma } }) => {
        const sender = await prisma.user.findFirst({ where: { id: senderId } });
        const chat = await prisma.chat.findFirst({ where: { id: chatId } });

        if (!!!sender) {
          return {
            error: {
              message: "Sender could not be found.",
              field: "sender",
            },
          };
        }
        if (!!!chat) {
          return {
            error: {
              message: "The chat could not be found.",
              field: "chat",
            },
          };
        }
        const msg = await prisma.message.create({
          data: {
            message,
            chat: {
              connect: {
                id: chat.id,
              },
            },
            sender: {
              connect: {
                id: sender.id,
              },
            },
          },
          select: {
            sender: true,
            message: true,
            read: true,
            createdAt: true,
            chatId: true,
            id: true,
            updatedAt: true,
            userId: true,
          },
        });

        const _msg = await prisma.message.findFirst({
          where: {
            id: msg.id,
          },
          include: {
            sender: true,
            chat: {
              select: {
                chatName: true,
                createdAt: true,
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
                updatedAt: true,
                userToUserChatId: true,
                users: {
                  include: {
                    user: true,
                  },
                },
                id: true,
              },
            },
          },
        });
        if (_msg) {
          ee.emit(Events.ON_NEW_CHAT_MESSAGE, _msg);
          ee.emit(Events.ON_NEW_MESSAGE, _msg);
        }

        return msg;
      }
    ),
  onNewChatMessage: publicProcedure
    .input(onNewChatMessageSchema)
    .subscription(async ({ input: { chatId } }) => {
      return observable<Message>((emit) => {
        const onMessage = (msg: Message) => {
          if (msg.chatId === chatId) {
            emit.next(msg);
          }
        };
        ee.on(Events.ON_NEW_CHAT_MESSAGE, onMessage);
        return () => {
          ee.off(Events.ON_NEW_CHAT_MESSAGE, onMessage);
        };
      });
    }),

  onNewMessage: publicProcedure
    .input(onNewMessageSchema)
    .subscription(async ({ input: { uid } }) => {
      return observable<MessageType>((emit) => {
        const handler = (msg: MessageType) => {
          const me = msg.chat.users
            .map((u) => u.user)
            .find((u) => u.id === uid);
          if (!!me) {
            emit.next(msg);
          }
        };
        ee.on(Events.ON_NEW_MESSAGE, handler);
        return () => {
          ee.off(Events.ON_NEW_MESSAGE, handler);
        };
      });
    }),
  onReadMessages: publicProcedure
    .input(onReadMessagesSchema)
    .subscription(async ({ input: { chatId } }) => {
      return observable<
        Array<
          Message & {
            sender: User;
          }
        >
      >((emit) => {
        const handler = (
          msg: Array<
            Message & {
              sender: User;
            }
          >
        ) => {
          if (msg[0].chatId === chatId) {
            emit.next(msg);
          }
        };
        ee.on(Events.ON_READ_MESSAGES, handler);
        return () => {
          ee.off(Events.ON_READ_MESSAGES, handler);
        };
      });
    }),
});
