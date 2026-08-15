import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { toolboxGroups } from '../db/schema';

export const createToolboxGroupSchema = createInsertSchema(toolboxGroups).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateToolboxGroupSchema = createToolboxGroupSchema.partial();

export type CreateToolboxGroupDto = z.infer<typeof createToolboxGroupSchema>;
export type UpdateToolboxGroupDto = z.infer<typeof updateToolboxGroupSchema>;
