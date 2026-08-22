import { pgTable, text } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const contact = pgTable('contact', {
  ...idColumn,
  body: text('body'),
  ctaLabel: text('cta_label'),
  ctaUrl: text('cta_url'),
  ...timestampColumns,
});
