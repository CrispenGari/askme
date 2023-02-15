import { string } from "prop-types";
import { z } from "zod";

export const sendMessageSchema = z.object({
  message: z.string(),
  senderId: z.string(),
  chatId: z.string(),
});

export const reactToMessageSchema = z.object({
  messageId: z.string(),
});
export const unSendMessageSchema = z.object({
  messageId: z.string(),
});
export const deleteMessageSchema = z.object({
  messageId: z.string(),
});

export const chatMessagesSchema = z.object({
  chatId: z.string(),
});
export const onReadMessagesSchema = z.object({
  chatId: z.string(),
});

export const onMessageReactionSchema = z.object({
  chatId: z.string(),
});
export const onMessageReactionNotificationSchema = z.object({
  userId: z.string(),
});
export const onUnSendMessageSchema = z.object({
  chatId: z.string(),
});
export const onDeleteMessageSchema = z.object({
  chatId: z.string(),
});
export const openMessagesSchema = z.object({
  chatId: z.string(),
});
export const countUnOpenedMessagesSchema = z.object({
  chatId: z.string(),
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
