import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { templates } from '../db/schema';

export const createTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTemplateSchema = createTemplateSchema.partial();

export type CreateTemplateDto = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateDto = z.infer<typeof updateTemplateSchema>;
