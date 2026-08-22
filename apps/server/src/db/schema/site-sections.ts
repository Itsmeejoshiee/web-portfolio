import { pgTable, pgEnum, text } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const siteSectionKeyEnum = pgEnum('site_section_key', [
  'hero',
  'toolbox',
  'templates-preview',
  'work-header',
  'templates-header',
  'blog-header',
  'achievements-header',
  'studio-mission',
]);

export const siteSections = pgTable('site_sections', {
  ...idColumn,
  section: siteSectionKeyEnum('section').notNull().unique(),
  body: text('body'),
  ...timestampColumns,
});
