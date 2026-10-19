import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ArchiveCurrencySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Archive a currency',
      description:
        'Marks a currency as archived without removing it from the database.',
    }),

    ApiNoContentResponse({
      description: 'Currency archived successfully.',
    }),

    ApiBadRequestResponse({
      description: 'Invalid currency ID or validation error.',
    }),

    ApiNotFoundResponse({
      description: 'Currency not found.',
    }),
  );
}
