import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { templates } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import { assertFeaturedLimitNotExceeded } from '../common/featured-limit';
import type { CreateTemplateDto, UpdateTemplateDto } from './templates.dto';

@Injectable()
export class TemplatesService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return this.db.select().from(templates).orderBy(templates.id);
  }

  async findOne(id: number) {
    const [template] = await this.db.select().from(templates).where(eq(templates.id, id));
    return assertFound(template, 'Template', id);
  }

  async create(dto: CreateTemplateDto) {
    if (dto.featured) {
      await assertFeaturedLimitNotExceeded(this.db, templates, 'templates');
    }
    const [template] = await this.db.insert(templates).values(dto).returning();
    return template;
  }

  async update(id: number, dto: UpdateTemplateDto) {
    if (dto.featured) {
      await assertFeaturedLimitNotExceeded(this.db, templates, 'templates', id);
    }
    const [template] = await this.db
      .update(templates)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(templates.id, id))
      .returning();
    return assertFound(template, 'Template', id);
  }

  async remove(id: number) {
    const [template] = await this.db.delete(templates).where(eq(templates.id, id)).returning();
    return assertFound(template, 'Template', id);
  }
}
