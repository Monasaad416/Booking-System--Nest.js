import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CityUpdatedResponseDto } from '../dtos/city-updated-response.dto';

export function UpdateCitySwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'City updated successfully',
      type: CityUpdatedResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid city data or validation error.',
      schema: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      examples: {
        invalidCredentials: {
          summary: 'Invalid city data',
          value: {
            error: [{ message: 'Invalid city data' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Update a city',
      description: 'Update a city',
    }),
  );
}
