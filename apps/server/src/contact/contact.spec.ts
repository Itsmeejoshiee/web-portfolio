import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { ContactModule } from './contact.module';
import { createTestDb } from '../test/test-db';
import { createTestApp } from '../test/test-app';
import { contact } from '../db/schema';

describe('Contact API', () => {
  let app: INestApplication;
  let db: ReturnType<typeof createTestDb>['db'];
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, ContactModule]));
    ({ db, pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  // contact is a single fixed row seeded by migration — there is no create/delete,
  // so isolation resets the row instead of truncating the table.
  beforeEach(async () => {
    await db.update(contact).set({ body: null, ctaLabel: null, ctaUrl: null });
  });

  it('GET /contact returns the seeded row', async () => {
    const response = await request(app.getHttpServer()).get('/contact');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('GET /contact/:id returns the matching row', async () => {
    const [row] = await db.select().from(contact);

    const response = await request(app.getHttpServer()).get(`/contact/${row.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: row.id });
  });

  it('GET /contact/:id returns 404 for a row that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/contact/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /contact/:id updates body, ctaLabel and ctaUrl when authenticated', async () => {
    const [row] = await db.select().from(contact);

    const response = await request(app.getHttpServer())
      .patch(`/contact/${row.id}`)
      .set('Cookie', adminCookie)
      .send({ body: 'Updated closing line.', ctaLabel: 'hello@joshgorospe.com', ctaUrl: 'mailto:hello@joshgorospe.com' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: row.id,
      body: 'Updated closing line.',
      ctaLabel: 'hello@joshgorospe.com',
      ctaUrl: 'mailto:hello@joshgorospe.com',
    });
  });

  it('PATCH /contact/:id returns 404 for a row that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/contact/999999')
      .set('Cookie', adminCookie)
      .send({ body: 'Updated closing line.' });

    expect(response.status).toBe(404);
  });

  it('PATCH /contact/:id is rejected without authentication', async () => {
    const [row] = await db.select().from(contact);

    const response = await request(app.getHttpServer()).patch(`/contact/${row.id}`).send({ body: 'Updated closing line.' });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/contact/${row.id}`);
    expect(unchanged.body.body).toBeNull();
  });

  it('has no POST route', async () => {
    const response = await request(app.getHttpServer()).post('/contact').set('Cookie', adminCookie).send({ body: 'x' });

    expect(response.status).toBe(404);
  });

  it('has no DELETE route', async () => {
    const [row] = await db.select().from(contact);

    const response = await request(app.getHttpServer()).delete(`/contact/${row.id}`).set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });
});
