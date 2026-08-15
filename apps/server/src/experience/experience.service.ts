import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { experience } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import type { CreateExperienceDto, UpdateExperienceDto } from './experience.dto';

@Injectable()
export class ExperienceService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return this.db.select().from(experience).orderBy(experience.id);
  }

  async findOne(id: number) {
    const [entry] = await this.db.select().from(experience).where(eq(experience.id, id));
    return assertFound(entry, 'Experience entry', id);
  }

  async create(dto: CreateExperienceDto) {
    const [entry] = await this.db.insert(experience).values(dto).returning();
    return entry;
  }

  async update(id: number, dto: UpdateExperienceDto) {
    const [entry] = await this.db
      .update(experience)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(experience.id, id))
      .returning();
    return assertFound(entry, 'Experience entry', id);
  }

  async remove(id: number) {
    const [entry] = await this.db.delete(experience).where(eq(experience.id, id)).returning();
    return assertFound(entry, 'Experience entry', id);
  }
}
