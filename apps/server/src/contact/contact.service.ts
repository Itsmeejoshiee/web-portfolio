import { Inject, Injectable } from '@nestjs/common';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/db.module';
import { contact } from '../db/schema';
import * as schema from '../db/schema';
import { findAllRows, findOneRow, updateRow } from '../common/fixed-row-crud';
import type { UpdateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  findAll() {
    return findAllRows(this.db, contact);
  }

  findOne(id: number) {
    return findOneRow(this.db, contact, id, 'Contact');
  }

  update(id: number, dto: UpdateContactDto) {
    return updateRow(this.db, contact, id, dto, 'Contact');
  }
}
