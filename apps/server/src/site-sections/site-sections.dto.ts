import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { siteSections } from '../db/schema';

export const updateSiteSectionSchema = createInsertSchema(siteSections).pick({ body: true }).partial();

export type UpdateSiteSectionDto = z.infer<typeof updateSiteSectionSchema>;
