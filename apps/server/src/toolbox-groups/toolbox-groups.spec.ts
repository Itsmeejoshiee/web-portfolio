import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { eq } from 'drizzle-orm';
import { DbModule } from '../db/db.module';
import { ToolboxGroupsModule } from './toolbox-groups.module';
import { createTestDb } from '../test/test-db';
import { createTestApp } from '../test/test-app';
import { toolboxGroups } from '../db/schema';

describe('Toolbox Groups API', () => {
  let app: INestApplication;
  let db: ReturnType<typeof createTestDb>['db'];
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, ToolboxGroupsModule]));
    ({ db, pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  // toolbox_groups is enum-constrained to exactly 3 rows seeded by migration — there is
  // no create/delete, so isolation resets each row's items instead of truncating the table.
  beforeEach(async () => {
    await db.update(toolboxGroups).set({ items: [] });
  });

  it('GET /toolbox-groups returns the 3 seeded categories', async () => {
    const response = await request(app.getHttpServer()).get('/toolbox-groups');

    expect(response.status).toBe(200);
    expect(response.body.map((g: { category: string }) => g.category).sort()).toEqual([
      'frameworks',
      'languages',
      'tools',
    ]);
  });

  it('GET /toolbox-groups/:id returns the matching group', async () => {
    const [languages] = await db.select().from(toolboxGroups).where(eq(toolboxGroups.category, 'languages'));

    const response = await request(app.getHttpServer()).get(`/toolbox-groups/${languages.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: languages.id, category: 'languages' });
  });

  it('GET /toolbox-groups/:id returns 404 for a group that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/toolbox-groups/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /toolbox-groups/:id updates items when authenticated', async () => {
    const [languages] = await db.select().from(toolboxGroups).where(eq(toolboxGroups.category, 'languages'));

    const response = await request(app.getHttpServer())
      .patch(`/toolbox-groups/${languages.id}`)
      .set('Cookie', adminCookie)
      .send({ items: ['python', 'go'] });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: languages.id, items: ['python', 'go'] });
  });

  it('PATCH /toolbox-groups/:id ignores an attempt to change category', async () => {
    const [languages] = await db.select().from(toolboxGroups).where(eq(toolboxGroups.category, 'languages'));

    const response = await request(app.getHttpServer())
      .patch(`/toolbox-groups/${languages.id}`)
      .set('Cookie', adminCookie)
      .send({ category: 'tools', items: ['python'] });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: languages.id, category: 'languages', items: ['python'] });
  });

  it('PATCH /toolbox-groups/:id returns 404 for a group that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/toolbox-groups/999999')
      .set('Cookie', adminCookie)
      .send({ items: ['python'] });

    expect(response.status).toBe(404);
  });

  it('PATCH /toolbox-groups/:id is rejected without authentication', async () => {
    const [languages] = await db.select().from(toolboxGroups).where(eq(toolboxGroups.category, 'languages'));

    const response = await request(app.getHttpServer())
      .patch(`/toolbox-groups/${languages.id}`)
      .send({ items: ['python'] });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/toolbox-groups/${languages.id}`);
    expect(unchanged.body.items).toEqual([]);
  });

  it('has no POST route', async () => {
    const response = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send({ category: 'languages', items: ['rust'] });

    expect(response.status).toBe(404);
  });

  it('has no DELETE route', async () => {
    const [languages] = await db.select().from(toolboxGroups).where(eq(toolboxGroups.category, 'languages'));

    const response = await request(app.getHttpServer())
      .delete(`/toolbox-groups/${languages.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });
});
