import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { ExperienceModule } from './experience.module';
import { createTestDb, truncateTables } from '../test/test-db';
import { createTestApp } from '../test/test-app';

describe('Experience API', () => {
  let app: INestApplication;
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  const professionalEntry = {
    track: 'professional',
    title: 'Senior Engineer',
    organization: 'Acme Corp',
    startDate: 'Jan 2023',
    endDate: null,
    location: 'Manila, Philippines',
    category: null,
    summary: 'Led the platform team.',
  };

  const communityEntry = {
    track: 'community',
    title: 'Mentor',
    organization: 'Dev Community',
    startDate: 'Mar 2022',
    endDate: 'Dec 2023',
    location: null,
    category: 'mentorship',
    summary: 'Mentored early-career developers.',
  };

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, ExperienceModule]));
    ({ pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  beforeEach(async () => {
    await truncateTables(pool, 'experience');
  });

  it('GET /experience returns an empty list when there are no entries', async () => {
    const response = await request(app.getHttpServer()).get('/experience');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /experience creates a professional-track entry when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send(professionalEntry);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ track: 'professional', title: 'Senior Engineer', location: 'Manila, Philippines' });

    const list = await request(app.getHttpServer()).get('/experience');
    expect(list.body).toHaveLength(1);
  });

  it('POST /experience creates a community-track entry when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send(communityEntry);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ track: 'community', category: 'mentorship' });
  });

  it('POST /experience is rejected without authentication', async () => {
    const response = await request(app.getHttpServer()).post('/experience').send(professionalEntry);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/experience');
    expect(list.body).toHaveLength(0);
  });

  it('POST /experience rejects an invalid payload with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send({ title: 'Missing everything else' });

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/experience');
    expect(list.body).toHaveLength(0);
  });

  it('POST /experience rejects an invalid track enum value with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send({ ...professionalEntry, track: 'not-a-real-track' });

    expect(response.status).toBe(400);
  });

  it('GET /experience/:id returns the matching entry', async () => {
    const created = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send(professionalEntry);

    const response = await request(app.getHttpServer()).get(`/experience/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, title: 'Senior Engineer' });
  });

  it('GET /experience/:id returns 404 for an entry that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/experience/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /experience/:id updates an entry when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send(professionalEntry);

    const response = await request(app.getHttpServer())
      .patch(`/experience/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ endDate: 'Jun 2024' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, endDate: 'Jun 2024' });
  });

  it('PATCH /experience/:id returns 404 for an entry that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/experience/999999')
      .set('Cookie', adminCookie)
      .send({ endDate: 'Jun 2024' });

    expect(response.status).toBe(404);
  });

  it('PATCH /experience/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send(professionalEntry);

    const response = await request(app.getHttpServer())
      .patch(`/experience/${created.body.id}`)
      .send({ endDate: 'Jun 2024' });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/experience/${created.body.id}`);
    expect(unchanged.body.endDate).toBe(null);
  });

  it('DELETE /experience/:id removes an entry when authenticated', async () => {
    const created = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send(professionalEntry);

    const response = await request(app.getHttpServer())
      .delete(`/experience/${created.body.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);

    const list = await request(app.getHttpServer()).get('/experience');
    expect(list.body).toHaveLength(0);
  });

  it('DELETE /experience/:id returns 404 for an entry that does not exist', async () => {
    const response = await request(app.getHttpServer()).delete('/experience/999999').set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });

  it('DELETE /experience/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer())
      .post('/experience')
      .set('Cookie', adminCookie)
      .send(professionalEntry);

    const response = await request(app.getHttpServer()).delete(`/experience/${created.body.id}`);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/experience');
    expect(list.body).toHaveLength(1);
  });
});
