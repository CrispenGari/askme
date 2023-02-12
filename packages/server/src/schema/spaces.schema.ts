import { z } from "zod";
export const joinSpaceSchema = z.object({
  userId: z.string(),
  coodinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
});

export const leaveSpaceSchema = z.object({
  userId: z.string(),
});
export const onUserJoinSpaceSchema = z.object({
  userId: z.string(),
});
export const peopleInMySpaceSchema = z.object({
  userId: z.string(),
});
