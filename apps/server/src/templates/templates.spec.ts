import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { TemplatesModule } from './templates.module';
import { createTestDb, truncateTables } from '../test/test-db';
import { createTestApp } from '../test/test-app';

describe('Templates API', () => {
  let app: INestApplication;
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  const validTemplate = {
    title: 'Portfolio CMS',
    description: 'The exact database powering this site.',
    price: 'free',
    url: 'https://notion.so/templates/portfolio-cms',
    featured: true,
  };

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, TemplatesModule]));
    ({ pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  beforeEach(async () => {
    await truncateTables(pool, 'templates');
  });

  it('GET /templates returns an empty list when there are no templates', async () => {
    const response = await request(app.getHttpServer()).get('/templates');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /templates creates a template when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/templates')
      .set('Cookie', adminCookie)
      .send(validTemplate);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ title: 'Portfolio CMS', price: 'free', featured: true });

    const list = await request(app.getHttpServer()).get('/templates');
    expect(list.body).toHaveLength(1);
  });

  it('POST /templates is rejected without authentication', async () => {
    const response = await request(app.getHttpServer()).post('/templates').send(validTemplate);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/templates');
    expect(list.body).toHaveLength(0);
  });

  it('POST /templates rejects an invalid payload with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/templates')
      .set('Cookie', adminCookie)
      .send({ title: 'Missing everything else' });

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/templates');
    expect(list.body).toHaveLength(0);
  });

  it('GET /templates/:id returns the matching template', async () => {
    const created = await request(app.getHttpServer())
      .post('/templates')
      .set('Cookie', adminCookie)
      .send(validTemplate);

    const response = await request(app.getHttpServer()).get(`/templates/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, title: 'Portfolio CMS' });
  });

  it('GET /templates/:id returns 404 for a template that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/templates/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /templates/:id updates a template when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/templates')
      .set('Cookie', adminCookie)
      .send(validTemplate);

    const response = await request(app.getHttpServer())
      .patch(`/templates/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ price: '₱ 499' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, price: '₱ 499' });
  });

  it('PATCH /templates/:id returns 404 for a template that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/templates/999999')
      .set('Cookie', adminCookie)
      .send({ price: '₱ 499' });

    expect(response.status).toBe(404);
  });

  it('PATCH /templates/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/templates')
      .set('Cookie', adminCookie)
      .send(validTemplate);

    const response = await request(app.getHttpServer())
      .patch(`/templates/${created.body.id}`)
      .send({ price: '₱ 499' });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/templates/${created.body.id}`);
    expect(unchanged.body.price).toBe('free');
  });

  it('DELETE /templates/:id removes a template when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/templates')
      .set('Cookie', adminCookie)
      .send(validTemplate);

    const response = await request(app.getHttpServer())
      .delete(`/templates/${created.body.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);

    const list = await request(app.getHttpServer()).get('/templates');
    expect(list.body).toHaveLength(0);
  });

  it('DELETE /templates/:id returns 404 for a template that does not exist', async () => {
    const response = await request(app.getHttpServer()).delete('/templates/999999').set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });

  it('DELETE /templates/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/templates')
      .set('Cookie', adminCookie)
      .send(validTemplate);

    const response = await request(app.getHttpServer()).delete(`/templates/${created.body.id}`);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/templates');
    expect(list.body).toHaveLength(1);
  });
});
