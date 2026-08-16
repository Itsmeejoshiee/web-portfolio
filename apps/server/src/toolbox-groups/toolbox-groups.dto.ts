import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { toolboxGroups } from '../db/schema';

export const updateToolboxGroupSchema = createInsertSchema(toolboxGroups).pick({ items: true });

export type UpdateToolboxGroupDto = z.infer<typeof updateToolboxGroupSchema>;
