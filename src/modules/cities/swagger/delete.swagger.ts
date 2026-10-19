import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteCitySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Soft-delete a city',
      description:
        'Marks a city as deleted without removing it from the database.',
    }),

    ApiNoContentResponse({
      description: 'City deleted successfully.',
    }),

    ApiBadRequestResponse({
      description: 'Invalid city ID or validation error.',
    }),

    ApiNotFoundResponse({
      description: 'City not found.',
    }),
  );
}
