import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { assertFound } from './assert-found';

type FixedRowTable = PgTable & { id: PgColumn; updatedAt: PgColumn };

// Shared by every "fixed set of rows, no create/delete" resource (site sections,
// contact, toolbox groups, ...): plain functions rather than a base class, since each
// resource's Drizzle table and update DTO shape differ and a generic base class would
// need real type gymnastics for the same result these three functions already give.
//
// Drizzle's own generics can't stay precise across an arbitrary table passed as a
// parameter (its select/update builders key inference off the *literal* table type),
// so the query chains below go through `as any` — callers still get a properly typed
// `table` argument and a real row back via `assertFound`.
export function findAllRows(db: NodePgDatabase<Record<string, unknown>>, table: FixedRowTable) {
  return db
    .select()
    .from(table as unknown as PgTable)
    .orderBy(table.id);
}

export async function findOneRow(
  db: NodePgDatabase<Record<string, unknown>>,
  table: FixedRowTable,
  id: number,
  resourceLabel: string,
) {
  const [row] = await db
    .select()
    .from(table as unknown as PgTable)
    .where(eq(table.id, id));
  return assertFound(row, resourceLabel, id);
}

export async function updateRow(
  db: NodePgDatabase<Record<string, unknown>>,
  table: FixedRowTable,
  id: number,
  dto: Record<string, unknown>,
  resourceLabel: string,
) {
  const [row] = await db
    .update(table as unknown as PgTable)
    .set({ ...dto, updatedAt: new Date() })
    .where(eq(table.id, id))
    .returning();
  return assertFound(row, resourceLabel, id);
}
