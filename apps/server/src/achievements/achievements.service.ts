import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { achievements } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import type { CreateAchievementDto, UpdateAchievementDto } from './achievements.dto';

@Injectable()
export class AchievementsService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return this.db.select().from(achievements).orderBy(achievements.id);
  }

  async findOne(id: number) {
    const [achievement] = await this.db.select().from(achievements).where(eq(achievements.id, id));
    return assertFound(achievement, 'Achievement', id);
  }

  async create(dto: CreateAchievementDto) {
    const [achievement] = await this.db.insert(achievements).values(dto).returning();
    return achievement;
  }

  async update(id: number, dto: UpdateAchievementDto) {
    const [achievement] = await this.db
      .update(achievements)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(achievements.id, id))
      .returning();
    return assertFound(achievement, 'Achievement', id);
  }

  async remove(id: number) {
    const [achievement] = await this.db.delete(achievements).where(eq(achievements.id, id)).returning();
    return assertFound(achievement, 'Achievement', id);
  }
}
