import { string } from "prop-types";
import { z } from "zod";

export const sendMessageSchema = z.object({
  message: z.string(),
  sender: z.string(),
});

const messageSchema = z.object({
  id: z.string(),
  message: z.string(),

  sentAt: z.date(),
  sender: z.string(),
});

export type Message = z.TypeOf<typeof messageSchema>;

export const messageSubSchema = z.object({});
