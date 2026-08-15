import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { ProjectsModule } from './projects.module';
import { createTestDb, truncateTables } from '../test/test-db';
import { createTestApp } from '../test/test-app';

describe('Projects API', () => {
  let app: INestApplication;
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, ProjectsModule]));
    ({ pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  beforeEach(async () => {
    await truncateTables(pool, 'projects');
  });

  it('GET /projects returns an empty list when there are no projects', async () => {
    const response = await request(app.getHttpServer()).get('/projects');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /projects creates a project when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', adminCookie)
      .send({ title: 'Portfolio Redesign', excerpt: 'A ground-up rebuild.', tags: ['react'], featured: true });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: 'Portfolio Redesign',
      excerpt: 'A ground-up rebuild.',
      tags: ['react'],
      featured: true,
    });

    const list = await request(app.getHttpServer()).get('/projects');
    expect(list.body).toHaveLength(1);
  });

  it('POST /projects is rejected without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/projects')
      .send({ title: 'Portfolio Redesign', excerpt: 'A ground-up rebuild.', tags: [], featured: false });

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/projects');
    expect(list.body).toHaveLength(0);
  });

  it('POST /projects rejects an invalid payload with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', adminCookie)
      .send({ title: 'Missing excerpt and tags' });

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/projects');
    expect(list.body).toHaveLength(0);
  });

  it('GET /projects/:id returns the matching project', async () => {
    const created = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', adminCookie)
      .send({ title: 'Portfolio Redesign', excerpt: 'A ground-up rebuild.', tags: [], featured: false });

    const response = await request(app.getHttpServer()).get(`/projects/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, title: 'Portfolio Redesign' });
  });

  it('GET /projects/:id returns 404 for a project that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/projects/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /projects/:id updates a project when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', adminCookie)
      .send({ title: 'Portfolio Redesign', excerpt: 'A ground-up rebuild.', tags: [], featured: false });

    const response = await request(app.getHttpServer())
      .patch(`/projects/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ featured: true });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, title: 'Portfolio Redesign', featured: true });
  });

  it('PATCH /projects/:id returns 404 for a project that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/projects/999999')
      .set('Cookie', adminCookie)
      .send({ featured: true });

    expect(response.status).toBe(404);
  });

  it('PATCH /projects/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', adminCookie)
      .send({ title: 'Portfolio Redesign', excerpt: 'A ground-up rebuild.', tags: [], featured: false });

    const response = await request(app.getHttpServer()).patch(`/projects/${created.body.id}`).send({ featured: true });

    expect(response.status).toBe(401);
  });

  it('DELETE /projects/:id removes a project when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', adminCookie)
      .send({ title: 'Portfolio Redesign', excerpt: 'A ground-up rebuild.', tags: [], featured: false });

    const response = await request(app.getHttpServer())
      .delete(`/projects/${created.body.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);

    const list = await request(app.getHttpServer()).get('/projects');
    expect(list.body).toHaveLength(0);
  });

  it('DELETE /projects/:id returns 404 for a project that does not exist', async () => {
    const response = await request(app.getHttpServer()).delete('/projects/999999').set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });

  it('DELETE /projects/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/projects')
      .set('Cookie', adminCookie)
      .send({ title: 'Portfolio Redesign', excerpt: 'A ground-up rebuild.', tags: [], featured: false });

    const response = await request(app.getHttpServer()).delete(`/projects/${created.body.id}`);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/projects');
    expect(list.body).toHaveLength(1);
  });
});
