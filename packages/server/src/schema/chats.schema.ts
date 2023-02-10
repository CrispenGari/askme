import { z } from "zod";

export const initializeChatSchema = z.object({
  friendId: z.string(),
});
