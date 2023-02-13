import { z } from "zod";
export const joinSpaceSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export const onUserJoinSpaceSchema = z.object({
  userId: z.string(),
});
export const onUserLeaveSpaceSchema = z.object({
  userId: z.string(),
});
