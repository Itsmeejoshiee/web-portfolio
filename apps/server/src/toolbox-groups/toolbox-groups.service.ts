import { Inject, Injectable } from '@nestjs/common';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { toolboxGroups } from '../db/schema';
import * as schema from '../db/schema';
import { findAllRows, findOneRow, updateRow } from '../common/fixed-row-crud';
import type { UpdateToolboxGroupDto } from './toolbox-groups.dto';

@Injectable()
export class ToolboxGroupsService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return findAllRows(this.db, toolboxGroups);
  }

  findOne(id: number) {
    return findOneRow(this.db, toolboxGroups, id, 'Toolbox group');
  }

  update(id: number, dto: UpdateToolboxGroupDto) {
    return updateRow(this.db, toolboxGroups, id, dto, 'Toolbox group');
  }
}
