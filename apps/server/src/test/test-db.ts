import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';

export function createTestDb() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return { db: drizzle(pool, { schema }), pool };
}

export async function truncateAllTables(pool: Pool) {
  await pool.query(
    'TRUNCATE TABLE projects, blog_posts, templates, experience, achievements, toolbox_groups, site_sections RESTART IDENTITY CASCADE',
  );
}
