import { pgTable, text } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const toolboxGroups = pgTable('toolbox_groups', {
  ...idColumn,
  category: text('category').notNull(),
  items: text('items').array().notNull().default([]),
  ...timestampColumns,
});
