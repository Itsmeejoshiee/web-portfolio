import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import type { ZodType } from 'zod';

// @UsePipes() applies to every parameter of a handler, not just @Body() — this pipe
// deliberately only validates the body param and passes everything else (route params,
// query params) through untouched, since a Zod object schema can't validate a bare string.
export class ZodBodyValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }
    return result.data;
  }
}
