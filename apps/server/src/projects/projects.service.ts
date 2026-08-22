import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { projects } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import { assertFeaturedLimitNotExceeded } from '../common/featured-limit';
import type { CreateProjectDto, UpdateProjectDto } from './projects.dto';

@Injectable()
export class ProjectsService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return this.db.select().from(projects).orderBy(projects.id);
  }

  async findOne(id: number) {
    const [project] = await this.db.select().from(projects).where(eq(projects.id, id));
    return assertFound(project, 'Project', id);
  }

  async create(dto: CreateProjectDto) {
    if (dto.featured) {
      await assertFeaturedLimitNotExceeded(this.db, projects, 'projects');
    }
    const [project] = await this.db.insert(projects).values(dto).returning();
    return project;
  }

  async update(id: number, dto: UpdateProjectDto) {
    if (dto.featured) {
      await assertFeaturedLimitNotExceeded(this.db, projects, 'projects', id);
    }
    const [project] = await this.db
      .update(projects)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return assertFound(project, 'Project', id);
  }

  async remove(id: number) {
    const [project] = await this.db.delete(projects).where(eq(projects.id, id)).returning();
    return assertFound(project, 'Project', id);
  }
}
