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

export const updatePublicDetailsSchema = z.object({
  nickname: z.string(),
  bio: z.string().nullable(),
});

export const updateAvatarSchema = z.object({
  avatar: z.string(),
});

export const updateUserStateSchema = z.object({
  isOnline: z.boolean(),
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
export const onUserOnlineSchema = z.object({
  userId: z.string(),
});
export const onNewUserJoinedSchema = z.object({
  currentUserId: z.string(),
});
