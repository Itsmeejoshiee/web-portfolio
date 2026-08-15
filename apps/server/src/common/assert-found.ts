import { NotFoundException } from '@nestjs/common';

export function assertFound<T>(row: T | undefined, resourceName: string, id: number | string): T {
  if (!row) {
    throw new NotFoundException(`${resourceName} ${id} not found`);
  }
  return row;
}
