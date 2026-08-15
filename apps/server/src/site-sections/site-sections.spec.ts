import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { SiteSectionsModule } from './site-sections.module';
import { createTestDb, truncateTables } from '../test/test-db';
import { createTestApp } from '../test/test-app';

describe('Site Sections API', () => {
  let app: INestApplication;
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  const heroSection = {
    section: 'hero',
    body: 'Building fast, focused web experiences.',
    ctaLabel: null,
    ctaUrl: null,
  };

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, SiteSectionsModule]));
    ({ pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  beforeEach(async () => {
    await truncateTables(pool, 'site_sections');
  });

  it('GET /site-sections returns an empty list when there are no sections', async () => {
    const response = await request(app.getHttpServer()).get('/site-sections');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /site-sections creates a section when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send(heroSection);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ section: 'hero', body: heroSection.body });

    const list = await request(app.getHttpServer()).get('/site-sections');
    expect(list.body).toHaveLength(1);
  });

  it('POST /site-sections is rejected without authentication', async () => {
    const response = await request(app.getHttpServer()).post('/site-sections').send(heroSection);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/site-sections');
    expect(list.body).toHaveLength(0);
  });

  it('POST /site-sections rejects an invalid payload with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send({ body: 'Missing the section key' });

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/site-sections');
    expect(list.body).toHaveLength(0);
  });

  it('POST /site-sections rejects a duplicate section key with 409', async () => {
    await request(app.getHttpServer()).post('/site-sections').set('Cookie', adminCookie).send(heroSection);

    const response = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send({ ...heroSection, body: 'A different body for the same section key' });

    expect(response.status).toBe(409);

    const list = await request(app.getHttpServer()).get('/site-sections');
    expect(list.body).toHaveLength(1);
  });

  it('GET /site-sections/:id returns the matching section', async () => {
    const created = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send(heroSection);

    const response = await request(app.getHttpServer()).get(`/site-sections/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, section: 'hero' });
  });

  it('GET /site-sections/:id returns 404 for a section that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/site-sections/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /site-sections/:id updates a section when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send(heroSection);

    const response = await request(app.getHttpServer())
      .patch(`/site-sections/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ body: 'An updated tagline.' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, body: 'An updated tagline.' });
  });

  it('PATCH /site-sections/:id rejects renaming to a section key that already exists with 409', async () => {
    await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send({ ...heroSection, section: 'contact' });
    const created = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send(heroSection);

    const response = await request(app.getHttpServer())
      .patch(`/site-sections/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ section: 'contact' });

    expect(response.status).toBe(409);

    const unchanged = await request(app.getHttpServer()).get(`/site-sections/${created.body.id}`);
    expect(unchanged.body.section).toBe('hero');
  });

  it('PATCH /site-sections/:id returns 404 for a section that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/site-sections/999999')
      .set('Cookie', adminCookie)
      .send({ body: 'An updated tagline.' });

    expect(response.status).toBe(404);
  });

  it('PATCH /site-sections/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send(heroSection);

    const response = await request(app.getHttpServer())
      .patch(`/site-sections/${created.body.id}`)
      .send({ body: 'An updated tagline.' });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/site-sections/${created.body.id}`);
    expect(unchanged.body.body).toBe(heroSection.body);
  });

  it('DELETE /site-sections/:id removes a section when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send(heroSection);

    const response = await request(app.getHttpServer())
      .delete(`/site-sections/${created.body.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);

    const list = await request(app.getHttpServer()).get('/site-sections');
    expect(list.body).toHaveLength(0);
  });

  it('DELETE /site-sections/:id returns 404 for a section that does not exist', async () => {
    const response = await request(app.getHttpServer()).delete('/site-sections/999999').set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });

  it('DELETE /site-sections/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send(heroSection);

    const response = await request(app.getHttpServer()).delete(`/site-sections/${created.body.id}`);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/site-sections');
    expect(list.body).toHaveLength(1);
  });
});
