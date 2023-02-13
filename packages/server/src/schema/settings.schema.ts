import { z } from "zod";

export const updateSettingsSchema = z.object({
  distance: z.number().min(1).max(10).default(3),
  allowNotification: z.boolean().default(true),
});
