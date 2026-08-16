import { pgTable, pgEnum, text } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const siteSectionKeyEnum = pgEnum('site_section_key', [
  'hero',
  'contact',
  'toolbox',
  'templates-preview',
  'work-header',
  'templates-header',
  'blog-header',
  'studio-mission',
]);

export const siteSections = pgTable('site_sections', {
  ...idColumn,
  section: siteSectionKeyEnum('section').notNull().unique(),
  body: text('body'),
  ctaLabel: text('cta_label'),
  ctaUrl: text('cta_url'),
  ...timestampColumns,
});
