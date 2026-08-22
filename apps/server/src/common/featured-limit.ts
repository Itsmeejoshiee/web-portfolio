import { and, count, eq, ne } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { BadRequestException } from '@nestjs/common';

type FeaturedTable = PgTable & { id: PgColumn; featured: PgColumn };

const FEATURED_LIMIT = 3;

// Shared by every resource with a homepage "featured" cap (achievements, templates,
// projects): call before persisting a row whose `featured` is being set to true.
// `excludeId` is the row's own id on an update, so a row that's already featured
// doesn't count against its own limit when just re-saving other fields.
export async function assertFeaturedLimitNotExceeded(
  db: NodePgDatabase<Record<string, unknown>>,
  table: FeaturedTable,
  resourceLabel: string,
  excludeId?: number,
) {
  const condition =
    excludeId === undefined ? eq(table.featured, true) : and(eq(table.featured, true), ne(table.id, excludeId));
  const [{ value }] = await db
    .select({ value: count() })
    .from(table as unknown as PgTable)
    .where(condition);

  if (value >= FEATURED_LIMIT) {
    throw new BadRequestException(
      `Only ${FEATURED_LIMIT} featured ${resourceLabel} allowed — un-feature one first.`,
    );
  }
}
