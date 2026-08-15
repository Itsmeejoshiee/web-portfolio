import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { blogPosts } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import type { CreateBlogPostDto, UpdateBlogPostDto } from './blog-posts.dto';

@Injectable()
export class BlogPostsService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return this.db.select().from(blogPosts).orderBy(blogPosts.id);
  }

  async findOne(id: number) {
    const [post] = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return assertFound(post, 'Blog post', id);
  }

  async create(dto: CreateBlogPostDto) {
    const [post] = await this.db.insert(blogPosts).values(dto).returning();
    return post;
  }

  async update(id: number, dto: UpdateBlogPostDto) {
    const [post] = await this.db
      .update(blogPosts)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return assertFound(post, 'Blog post', id);
  }

  async remove(id: number) {
    const [post] = await this.db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return assertFound(post, 'Blog post', id);
  }
}
