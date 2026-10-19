import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CityCreatedResponseDto } from '../dtos/city-created-response.dto';

export function CreateCitySwagger() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'City created successfully',
      type: CityCreatedResponseDto,
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
      summary: 'Create a new city',
      description: 'Create a new city',
    }),
  );
}
