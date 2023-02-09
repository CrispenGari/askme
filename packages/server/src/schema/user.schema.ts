import { z } from "zod";
export const registerSchema = z.object({
  phoneNumber: z.string(),
  email: z.string(),
  duid: z.string(),
});

export const resendVerificationCodeSchema = z.object({
  phoneNumber: z.string(),
  email: z.string(),
});

export const confirmSchema = z.object({
  code: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  duid: z.string(),
});

export const profileSchema = z.object({
  avatar: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  nickname: z.string(),
});
export const onAuthStateChangeSchema = z.object({
  duid: z.string(),
});

export const onNewDeviceAuthenticationSchema = z.object({
  userId: z.string(),
});
