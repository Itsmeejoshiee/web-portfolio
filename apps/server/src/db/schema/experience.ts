import { pgTable, text, pgEnum } from 'drizzle-orm/pg-core';
import { idColumn, timestampColumns } from './columns';

export const experienceTrackEnum = pgEnum('experience_track', ['professional', 'community']);
export const experienceCategoryEnum = pgEnum('experience_category', ['community', 'mentorship']);

export const experience = pgTable('experience', {
  ...idColumn,
  track: experienceTrackEnum('track').notNull(),
  title: text('title').notNull(),
  organization: text('organization').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  location: text('location'),
  category: experienceCategoryEnum('category'),
  summary: text('summary').notNull(),
  ...timestampColumns,
});
