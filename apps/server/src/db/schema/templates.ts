import { pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const templates = pgTable('templates', {
  ...idColumn,
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: text('price').notNull(),
  url: text('url').notNull(),
  featured: boolean('featured').notNull().default(false),
  imageUrl: text('image_url'),
  ...timestampColumns,
});
