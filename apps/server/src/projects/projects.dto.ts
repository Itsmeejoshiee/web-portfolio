import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { projects } from '../db/schema';

export const createProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
