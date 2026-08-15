import { serial, timestamp } from 'drizzle-orm/pg-core';

export const idColumn = {
  id: serial('id').primaryKey(),
};

export const timestampColumns = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
};
