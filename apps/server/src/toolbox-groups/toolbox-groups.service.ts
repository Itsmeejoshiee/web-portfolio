import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { toolboxGroups } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import type { UpdateToolboxGroupDto } from './toolbox-groups.dto';

@Injectable()
export class ToolboxGroupsService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return this.db.select().from(toolboxGroups).orderBy(toolboxGroups.id);
  }

  async findOne(id: number) {
    const [group] = await this.db.select().from(toolboxGroups).where(eq(toolboxGroups.id, id));
    return assertFound(group, 'Toolbox group', id);
  }

  async update(id: number, dto: UpdateToolboxGroupDto) {
    const [group] = await this.db
      .update(toolboxGroups)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(toolboxGroups.id, id))
      .returning();
    return assertFound(group, 'Toolbox group', id);
  }
}
