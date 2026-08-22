import { pgTable, text, integer, date } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const blogPosts = pgTable('blog_posts', {
  ...idColumn,
  title: text('title').notNull(),
  date: date('date').notNull(),
  readTimeMinutes: integer('read_time_minutes').notNull(),
  tag: text('tag').notNull(),
  content: text('content'),
  imageUrl: text('image_url'),
  ...timestampColumns,
});
