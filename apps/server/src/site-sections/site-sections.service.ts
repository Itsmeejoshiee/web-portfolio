import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { siteSections } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import type { UpdateSiteSectionDto } from './site-sections.dto';

@Injectable()
export class SiteSectionsService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return this.db.select().from(siteSections).orderBy(siteSections.id);
  }

  async findOne(id: number) {
    const [section] = await this.db.select().from(siteSections).where(eq(siteSections.id, id));
    return assertFound(section, 'Site section', id);
  }

  async update(id: number, dto: UpdateSiteSectionDto) {
    const [section] = await this.db
      .update(siteSections)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(siteSections.id, id))
      .returning();
    return assertFound(section, 'Site section', id);
  }
}
