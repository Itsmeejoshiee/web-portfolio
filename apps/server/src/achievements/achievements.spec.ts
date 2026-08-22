import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { AchievementsModule } from './achievements.module';
import { createTestDb, truncateTables } from '../test/test-db';
import { createTestApp } from '../test/test-app';

describe('Achievements API', () => {
  let app: INestApplication;
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  const validAchievement = {
    title: 'Best Overall Hack',
    event: 'TechCrunch Hackathon · 2024',
    description: 'Built a real-time collab tool.',
    category: 'hackathon',
    featured: true,
  };

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, AchievementsModule]));
    ({ pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  beforeEach(async () => {
    await truncateTables(pool, 'achievements');
  });

  it('GET /achievements returns an empty list when there are no achievements', async () => {
    const response = await request(app.getHttpServer()).get('/achievements');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /achievements creates an achievement when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ title: 'Best Overall Hack', category: 'hackathon' });

    const list = await request(app.getHttpServer()).get('/achievements');
    expect(list.body).toHaveLength(1);
  });

  it('POST /achievements is rejected without authentication', async () => {
    const response = await request(app.getHttpServer()).post('/achievements').send(validAchievement);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/achievements');
    expect(list.body).toHaveLength(0);
  });

  it('POST /achievements rejects an invalid payload with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send({ title: 'Missing everything else' });

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/achievements');
    expect(list.body).toHaveLength(0);
  });

  it('GET /achievements/:id returns the matching achievement', async () => {
    const created = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    const response = await request(app.getHttpServer()).get(`/achievements/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, title: 'Best Overall Hack' });
  });

  it('GET /achievements/:id returns 404 for an achievement that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/achievements/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /achievements/:id updates an achievement when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    const response = await request(app.getHttpServer())
      .patch(`/achievements/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ category: 'university' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, category: 'university' });
  });

  it('PATCH /achievements/:id returns 404 for an achievement that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/achievements/999999')
      .set('Cookie', adminCookie)
      .send({ category: 'university' });

    expect(response.status).toBe(404);
  });

  it('PATCH /achievements/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    const response = await request(app.getHttpServer())
      .patch(`/achievements/${created.body.id}`)
      .send({ category: 'university' });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/achievements/${created.body.id}`);
    expect(unchanged.body.category).toBe('hackathon');
  });

  it('DELETE /achievements/:id removes an achievement when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    const response = await request(app.getHttpServer())
      .delete(`/achievements/${created.body.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);

    const list = await request(app.getHttpServer()).get('/achievements');
    expect(list.body).toHaveLength(0);
  });

  it('DELETE /achievements/:id returns 404 for an achievement that does not exist', async () => {
    const response = await request(app.getHttpServer()).delete('/achievements/999999').set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });

  it('DELETE /achievements/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    const response = await request(app.getHttpServer()).delete(`/achievements/${created.body.id}`);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/achievements');
    expect(list.body).toHaveLength(1);
  });

  it('POST /achievements rejects a 4th featured achievement with 400', async () => {
    for (let i = 0; i < 3; i += 1) {
      const response = await request(app.getHttpServer())
        .post('/achievements')
        .set('Cookie', adminCookie)
        .send(validAchievement);
      expect(response.status).toBe(201);
    }

    const response = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/achievements');
    expect(list.body).toHaveLength(3);
  });

  it('PATCH /achievements/:id rejects featuring a 4th achievement with 400', async () => {
    for (let i = 0; i < 3; i += 1) {
      await request(app.getHttpServer()).post('/achievements').set('Cookie', adminCookie).send(validAchievement);
    }
    const notFeatured = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send({ ...validAchievement, featured: false });

    const response = await request(app.getHttpServer())
      .patch(`/achievements/${notFeatured.body.id}`)
      .set('Cookie', adminCookie)
      .send({ featured: true });

    expect(response.status).toBe(400);
  });

  it('PATCH /achievements/:id allows re-saving an already-featured achievement', async () => {
    for (let i = 0; i < 2; i += 1) {
      await request(app.getHttpServer()).post('/achievements').set('Cookie', adminCookie).send(validAchievement);
    }
    const third = await request(app.getHttpServer())
      .post('/achievements')
      .set('Cookie', adminCookie)
      .send(validAchievement);

    const response = await request(app.getHttpServer())
      .patch(`/achievements/${third.body.id}`)
      .set('Cookie', adminCookie)
      .send({ featured: true, title: 'Renamed Hack' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ title: 'Renamed Hack', featured: true });
  });
});
