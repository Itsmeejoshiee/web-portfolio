import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { eq } from 'drizzle-orm';
import { DbModule } from '../db/db.module';
import { SiteSectionsModule } from './site-sections.module';
import { createTestDb } from '../test/test-db';
import { createTestApp } from '../test/test-app';
import { siteSections } from '../db/schema';

const SEEDED_SECTION_KEYS = [
  'blog-header',
  'hero',
  'studio-mission',
  'templates-header',
  'templates-preview',
  'toolbox',
  'work-header',
];

describe('Site Sections API', () => {
  let app: INestApplication;
  let db: ReturnType<typeof createTestDb>['db'];
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, SiteSectionsModule]));
    ({ db, pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  // site_sections is enum-constrained to exactly the 7 rows seeded by migration — there
  // is no create/delete, so isolation resets each row instead of truncating the table.
  beforeEach(async () => {
    await db.update(siteSections).set({ body: null });
  });

  it('GET /site-sections returns the 7 seeded sections', async () => {
    const response = await request(app.getHttpServer()).get('/site-sections');

    expect(response.status).toBe(200);
    expect(response.body.map((s: { section: string }) => s.section).sort()).toEqual(SEEDED_SECTION_KEYS);
  });

  it('GET /site-sections/:id returns the matching section', async () => {
    const [hero] = await db.select().from(siteSections).where(eq(siteSections.section, 'hero'));

    const response = await request(app.getHttpServer()).get(`/site-sections/${hero.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: hero.id, section: 'hero' });
  });

  it('GET /site-sections/:id returns 404 for a section that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/site-sections/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /site-sections/:id updates body when authenticated', async () => {
    const [hero] = await db.select().from(siteSections).where(eq(siteSections.section, 'hero'));

    const response = await request(app.getHttpServer())
      .patch(`/site-sections/${hero.id}`)
      .set('Cookie', adminCookie)
      .send({ body: 'An updated tagline.' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: hero.id, body: 'An updated tagline.' });
  });

  it('PATCH /site-sections/:id ignores an attempt to change section', async () => {
    const [hero] = await db.select().from(siteSections).where(eq(siteSections.section, 'hero'));

    const response = await request(app.getHttpServer())
      .patch(`/site-sections/${hero.id}`)
      .set('Cookie', adminCookie)
      .send({ section: 'toolbox', body: 'Still the hero section.' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: hero.id, section: 'hero', body: 'Still the hero section.' });
  });

  it('PATCH /site-sections/:id returns 404 for a section that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/site-sections/999999')
      .set('Cookie', adminCookie)
      .send({ body: 'An updated tagline.' });

    expect(response.status).toBe(404);
  });

  it('PATCH /site-sections/:id is rejected without authentication', async () => {
    const [hero] = await db.select().from(siteSections).where(eq(siteSections.section, 'hero'));

    const response = await request(app.getHttpServer())
      .patch(`/site-sections/${hero.id}`)
      .send({ body: 'An updated tagline.' });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/site-sections/${hero.id}`);
    expect(unchanged.body.body).toBeNull();
  });

  it('has no POST route', async () => {
    const response = await request(app.getHttpServer())
      .post('/site-sections')
      .set('Cookie', adminCookie)
      .send({ section: 'hero', body: 'A new hero' });

    expect(response.status).toBe(404);
  });

  it('has no DELETE route', async () => {
    const [hero] = await db.select().from(siteSections).where(eq(siteSections.section, 'hero'));

    const response = await request(app.getHttpServer()).delete(`/site-sections/${hero.id}`).set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });
});
