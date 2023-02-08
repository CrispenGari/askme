import { z } from "zod";

export const registerSchema = z.object({
  phoneNumber: z.string(),
});

export const resendVerificationCodeSchema = z.object({
  phoneNumber: z.string(),
});

export const confirmSchema = z.object({
  code: z.string(),
  phoneNumber: z.string(),
});

export const profileSchema = z.object({
  avatar: z.string(),
  phoneNumber: z.string(),
  nickname: z.string(),
});
export const meSchema = z.object({
  jwt: z.string(),
});
