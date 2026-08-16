import { pgTable, pgEnum, text } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const toolboxCategoryEnum = pgEnum('toolbox_category', ['languages', 'frameworks', 'tools']);

export const toolboxGroups = pgTable('toolbox_groups', {
  ...idColumn,
  category: toolboxCategoryEnum('category').notNull().unique(),
  items: text('items').array().notNull().default([]),
  ...timestampColumns,
});
