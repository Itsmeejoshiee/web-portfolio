import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { experience } from '../db/schema';

export const createExperienceSchema = createInsertSchema(experience).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateExperienceSchema = createExperienceSchema.partial();

export type CreateExperienceDto = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceDto = z.infer<typeof updateExperienceSchema>;
