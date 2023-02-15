import { z } from "zod";

export const initializeChatSchema = z.object({
  friendId: z.string(),
});

export const onUserTypingSchema = z.object({
  chatId: z.string(),
  userId: z.string(),
});

export const userTypingSchema = z.object({
  chatId: z.string(),
  userId: z.string(),
  typing: z.boolean(),
});

export const pinChatSchema = z.object({
  chatId: z.string(),
});
