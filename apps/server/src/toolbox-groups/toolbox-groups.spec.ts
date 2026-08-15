import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { ToolboxGroupsModule } from './toolbox-groups.module';
import { createTestDb, truncateTables } from '../test/test-db';
import { createTestApp } from '../test/test-app';

describe('Toolbox Groups API', () => {
  let app: INestApplication;
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  const validGroup = {
    category: 'Languages',
    items: ['python', 'typescript', 'javascript', 'sql'],
  };

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, ToolboxGroupsModule]));
    ({ pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  beforeEach(async () => {
    await truncateTables(pool, 'toolbox_groups');
  });

  it('GET /toolbox-groups returns an empty list when there are no groups', async () => {
    const response = await request(app.getHttpServer()).get('/toolbox-groups');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /toolbox-groups creates a group when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send(validGroup);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ category: 'Languages', items: ['python', 'typescript', 'javascript', 'sql'] });

    const list = await request(app.getHttpServer()).get('/toolbox-groups');
    expect(list.body).toHaveLength(1);
  });

  it('POST /toolbox-groups creates a group with an empty items array', async () => {
    const response = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send({ category: 'Tools', items: [] });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ category: 'Tools', items: [] });
  });

  it('POST /toolbox-groups is rejected without authentication', async () => {
    const response = await request(app.getHttpServer()).post('/toolbox-groups').send(validGroup);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/toolbox-groups');
    expect(list.body).toHaveLength(0);
  });

  it('POST /toolbox-groups rejects an invalid payload with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send({ category: 'Languages', items: 'not-an-array' });

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/toolbox-groups');
    expect(list.body).toHaveLength(0);
  });

  it('GET /toolbox-groups/:id returns the matching group', async () => {
    const created = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send(validGroup);

    const response = await request(app.getHttpServer()).get(`/toolbox-groups/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, category: 'Languages' });
  });

  it('GET /toolbox-groups/:id returns 404 for a group that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/toolbox-groups/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /toolbox-groups/:id updates a group when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send(validGroup);

    const response = await request(app.getHttpServer())
      .patch(`/toolbox-groups/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ items: ['python', 'go'] });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, items: ['python', 'go'] });
  });

  it('PATCH /toolbox-groups/:id returns 404 for a group that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/toolbox-groups/999999')
      .set('Cookie', adminCookie)
      .send({ items: ['python'] });

    expect(response.status).toBe(404);
  });

  it('PATCH /toolbox-groups/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send(validGroup);

    const response = await request(app.getHttpServer())
      .patch(`/toolbox-groups/${created.body.id}`)
      .send({ items: ['python'] });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/toolbox-groups/${created.body.id}`);
    expect(unchanged.body.items).toEqual(['python', 'typescript', 'javascript', 'sql']);
  });

  it('DELETE /toolbox-groups/:id removes a group when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send(validGroup);

    const response = await request(app.getHttpServer())
      .delete(`/toolbox-groups/${created.body.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);

    const list = await request(app.getHttpServer()).get('/toolbox-groups');
    expect(list.body).toHaveLength(0);
  });

  it('DELETE /toolbox-groups/:id returns 404 for a group that does not exist', async () => {
    const response = await request(app.getHttpServer()).delete('/toolbox-groups/999999').set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });

  it('DELETE /toolbox-groups/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/toolbox-groups')
      .set('Cookie', adminCookie)
      .send(validGroup);

    const response = await request(app.getHttpServer()).delete(`/toolbox-groups/${created.body.id}`);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/toolbox-groups');
    expect(list.body).toHaveLength(1);
  });
});
