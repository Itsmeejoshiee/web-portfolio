import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { blogPosts } from '../db/schema';

export const createBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogPostDto = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostDto = z.infer<typeof updateBlogPostSchema>;
