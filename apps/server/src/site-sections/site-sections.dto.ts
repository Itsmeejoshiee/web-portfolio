import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { siteSections } from '../db/schema';

export const createSiteSectionSchema = createInsertSchema(siteSections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateSiteSectionSchema = createSiteSectionSchema.partial();

export type CreateSiteSectionDto = z.infer<typeof createSiteSectionSchema>;
export type UpdateSiteSectionDto = z.infer<typeof updateSiteSectionSchema>;
