import { pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const achievements = pgTable('achievements', {
  ...idColumn,
  title: text('title').notNull(),
  event: text('event').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  featured: boolean('featured').notNull().default(false),
  ...timestampColumns,
});
