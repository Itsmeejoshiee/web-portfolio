import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';

export function createTestDb() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return { db: drizzle(pool, { schema }), pool };
}

type TableName =
  | 'projects'
  | 'blog_posts'
  | 'templates'
  | 'experience'
  | 'achievements'
  | 'toolbox_groups'
  | 'site_sections';

// Truncates only the given table(s), not the whole schema — Vitest runs test files
// concurrently against the same shared test database, so a suite truncating tables
// it doesn't own would wipe out data another suite just inserted mid-run.
//
// This is a convention, not an enforced invariant: each spec file must only ever pass
// the table(s) it uniquely owns, and this only holds because tests within a single file
// run sequentially by default. If two suites ever need the same table, or `it.concurrent`
// gets enabled anywhere, this race reappears — the real fix at that point is running each
// test in its own transaction/savepoint that's rolled back afterward, not another patch here.
export async function truncateTables(pool: Pool, ...tables: TableName[]) {
  const identifiers = tables.map((table) => `"${table}"`).join(', ');
  await pool.query(`TRUNCATE TABLE ${identifiers} RESTART IDENTITY CASCADE`);
}
