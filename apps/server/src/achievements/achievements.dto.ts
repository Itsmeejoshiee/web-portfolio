import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { achievements } from '../db/schema';

export const createAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAchievementSchema = createAchievementSchema.partial();

export type CreateAchievementDto = z.infer<typeof createAchievementSchema>;
export type UpdateAchievementDto = z.infer<typeof updateAchievementSchema>;
