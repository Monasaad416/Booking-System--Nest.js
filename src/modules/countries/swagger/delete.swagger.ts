import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteCountrySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Soft-delete a country',
      description:
        'Marks a country as deleted without removing it from the database.',
    }),

    ApiNoContentResponse({
      description: 'Country deleted successfully.',
    }),

    ApiBadRequestResponse({
      description: 'Invalid country ID or validation error.',
    }),

    ApiNotFoundResponse({
      description: 'Country not found.',
    }),
  );
}
