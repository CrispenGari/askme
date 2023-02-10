import { observable } from "@trpc/server/observable";
import { Events } from "../../constants";
import { publicProcedure, router } from "../../trpc/trpc";

import {
  sendMessageSchema,
  onNewMessageSchema,
  chatMessagesSchema,
} from "../../schema/messages.schema";
import EventEmitter from "events";
import { verifyJwt } from "../../utils";
import { Message } from "@prisma/client";
const ee = new EventEmitter({
  captureRejections: true,
});
export const messagesRouter = router({
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
          },
        });
        if (_msg) ee.emit(Events.ON_NEW_MESSAGE, _msg);
        return msg;
      }
    ),
  onNewChatMessage: publicProcedure
    .input(onNewMessageSchema)
    .subscription(async ({ input: { chatId } }) => {
      return observable<Message>((emit) => {
        const onMessage = (msg: Message) => {
          if (msg.chatId === chatId) {
            emit.next(msg);
          }
        };
        ee.on(Events.ON_NEW_MESSAGE, onMessage);
        return () => {
          ee.off(Events.ON_NEW_MESSAGE, onMessage);
        };
      });
    }),
});
