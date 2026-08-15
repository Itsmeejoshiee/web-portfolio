import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleQueryError } from 'drizzle-orm/errors';
import { DatabaseError } from 'pg';
import { DRIZZLE } from '../db/db.module';
import { siteSections } from '../db/schema';
import * as schema from '../db/schema';
import { assertFound } from '../common/assert-found';
import type { CreateSiteSectionDto, UpdateSiteSectionDto } from './site-sections.dto';

const POSTGRES_UNIQUE_VIOLATION = '23505';

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

  async create(dto: CreateSiteSectionDto) {
    try {
      const [section] = await this.db.insert(siteSections).values(dto).returning();
      return section;
    } catch (error) {
      throw this.toConflictIfUniqueViolation(error, dto.section);
    }
  }

  async update(id: number, dto: UpdateSiteSectionDto) {
    try {
      const [section] = await this.db
        .update(siteSections)
        .set({ ...dto, updatedAt: new Date() })
        .where(eq(siteSections.id, id))
        .returning();
      return assertFound(section, 'Site section', id);
    } catch (error) {
      throw this.toConflictIfUniqueViolation(error, dto.section);
    }
  }

  async remove(id: number) {
    const [section] = await this.db.delete(siteSections).where(eq(siteSections.id, id)).returning();
    return assertFound(section, 'Site section', id);
  }

  // Drizzle wraps the raw `pg` driver error in a DrizzleQueryError, with the actual
  // pg.DatabaseError (carrying `.code`) nested under `.cause`.
  private toConflictIfUniqueViolation(error: unknown, section: string | undefined): unknown {
    if (
      error instanceof DrizzleQueryError &&
      error.cause instanceof DatabaseError &&
      error.cause.code === POSTGRES_UNIQUE_VIOLATION
    ) {
      return new ConflictException(`Site section "${section}" already exists`);
    }
    return error;
  }
}
