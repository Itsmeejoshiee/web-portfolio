import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DbModule } from '../db/db.module';
import { BlogPostsModule } from './blog-posts.module';
import { createTestDb, truncateTables } from '../test/test-db';
import { createTestApp } from '../test/test-app';

describe('Blog Posts API', () => {
  let app: INestApplication;
  let pool: ReturnType<typeof createTestDb>['pool'];
  let adminCookie: string;

  const validPost = {
    title: 'Shipping Faster With Vertical Slices',
    date: '2024-06-15',
    readTimeMinutes: 6,
    tag: 'process',
    featured: true,
  };

  beforeAll(async () => {
    ({ app, adminCookie } = await createTestApp([DbModule, BlogPostsModule]));
    ({ pool } = createTestDb());
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
  });

  beforeEach(async () => {
    await truncateTables(pool, 'blog_posts');
  });

  it('GET /blog-posts returns an empty list when there are no posts', async () => {
    const response = await request(app.getHttpServer()).get('/blog-posts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /blog-posts creates a post when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/blog-posts')
      .set('Cookie', adminCookie)
      .send(validPost);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ title: validPost.title, tag: 'process', featured: true });

    const list = await request(app.getHttpServer()).get('/blog-posts');
    expect(list.body).toHaveLength(1);
  });

  it('POST /blog-posts is rejected without authentication', async () => {
    const response = await request(app.getHttpServer()).post('/blog-posts').send(validPost);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/blog-posts');
    expect(list.body).toHaveLength(0);
  });

  it('POST /blog-posts rejects an invalid payload with 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/blog-posts')
      .set('Cookie', adminCookie)
      .send({ title: 'Missing everything else' });

    expect(response.status).toBe(400);

    const list = await request(app.getHttpServer()).get('/blog-posts');
    expect(list.body).toHaveLength(0);
  });

  it('POST /blog-posts stores the post content', async () => {
    const response = await request(app.getHttpServer())
      .post('/blog-posts')
      .set('Cookie', adminCookie)
      .send({ ...validPost, content: 'Paragraph one.\n\nParagraph two.' });

    expect(response.status).toBe(201);
    expect(response.body.content).toBe('Paragraph one.\n\nParagraph two.');
  });

  it('GET /blog-posts/:id returns the matching post', async () => {
    const created = await request(app.getHttpServer()).post('/blog-posts').set('Cookie', adminCookie).send(validPost);

    const response = await request(app.getHttpServer()).get(`/blog-posts/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, title: validPost.title });
  });

  it('GET /blog-posts/:id returns 404 for a post that does not exist', async () => {
    const response = await request(app.getHttpServer()).get('/blog-posts/999999');

    expect(response.status).toBe(404);
  });

  it('PATCH /blog-posts/:id updates a post when authenticated', async () => {
    const created = await request(app.getHttpServer()).post('/blog-posts').set('Cookie', adminCookie).send(validPost);

    const response = await request(app.getHttpServer())
      .patch(`/blog-posts/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ featured: false });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: created.body.id, featured: false });
  });

  it('PATCH /blog-posts/:id updates the post content', async () => {
    const created = await request(app.getHttpServer()).post('/blog-posts').set('Cookie', adminCookie).send(validPost);

    const response = await request(app.getHttpServer())
      .patch(`/blog-posts/${created.body.id}`)
      .set('Cookie', adminCookie)
      .send({ content: 'Updated body copy.' });

    expect(response.status).toBe(200);
    expect(response.body.content).toBe('Updated body copy.');
  });

  it('PATCH /blog-posts/:id returns 404 for a post that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/blog-posts/999999')
      .set('Cookie', adminCookie)
      .send({ featured: false });

    expect(response.status).toBe(404);
  });

  it('PATCH /blog-posts/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer()).post('/blog-posts').set('Cookie', adminCookie).send(validPost);

    const response = await request(app.getHttpServer())
      .patch(`/blog-posts/${created.body.id}`)
      .send({ featured: false });

    expect(response.status).toBe(401);

    const unchanged = await request(app.getHttpServer()).get(`/blog-posts/${created.body.id}`);
    expect(unchanged.body.featured).toBe(true);
  });

  it('DELETE /blog-posts/:id removes a post when authenticated', async () => {
    const created = await request(app.getHttpServer()).post('/blog-posts').set('Cookie', adminCookie).send(validPost);

    const response = await request(app.getHttpServer())
      .delete(`/blog-posts/${created.body.id}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);

    const list = await request(app.getHttpServer()).get('/blog-posts');
    expect(list.body).toHaveLength(0);
  });

  it('DELETE /blog-posts/:id returns 404 for a post that does not exist', async () => {
    const response = await request(app.getHttpServer()).delete('/blog-posts/999999').set('Cookie', adminCookie);

    expect(response.status).toBe(404);
  });

  it('DELETE /blog-posts/:id is rejected without authentication', async () => {
    const created = await request(app.getHttpServer()).post('/blog-posts').set('Cookie', adminCookie).send(validPost);

    const response = await request(app.getHttpServer()).delete(`/blog-posts/${created.body.id}`);

    expect(response.status).toBe(401);

    const list = await request(app.getHttpServer()).get('/blog-posts');
    expect(list.body).toHaveLength(1);
  });
});
