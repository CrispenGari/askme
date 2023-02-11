import { string } from "prop-types";
import { z } from "zod";

export const sendMessageSchema = z.object({
  message: z.string(),
  senderId: z.string(),
  chatId: z.string(),
});

export const chatMessagesSchema = z.object({
  chatId: z.string(),
});
export const markMessageAsReadSchema = z.object({
  messageId: z.string(),
  senderId: z.string(),
});

export const onNewChatMessageSchema = z.object({
  chatId: z.string(),
});
export const onNewMessageSchema = z.object({
  uid: z.string(),
});

export const onMarkAsReadSchema = z.object({
  uid: z.string(),
});
