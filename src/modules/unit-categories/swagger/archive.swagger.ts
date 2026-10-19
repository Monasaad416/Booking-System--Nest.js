import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ArchiveUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Archive a unit category',
      description:
        'Marks a unit category as archived without removing it from the database.',
    }),
    ApiNoContentResponse({
      description: 'Unit category archived successfully.',
    }),
    ApiBadRequestResponse({
      description: 'Unit category is already archived.',
    }),
    ApiNotFoundResponse({
      description: 'Unit category not found.',
    }),
  );
}
