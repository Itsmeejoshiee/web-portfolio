import { pgTable, text } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const siteSections = pgTable('site_sections', {
  ...idColumn,
  section: text('section').notNull().unique(),
  body: text('body'),
  ctaLabel: text('cta_label'),
  ctaUrl: text('cta_url'),
  ...timestampColumns,
});
