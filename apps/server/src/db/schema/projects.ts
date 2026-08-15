import { pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const projects = pgTable('projects', {
  ...idColumn,
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  tags: text('tags').array().notNull().default([]),
  featured: boolean('featured').notNull().default(false),
  imageUrl: text('image_url'),
  ...timestampColumns,
});
