import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CityCreatedResponseDto } from '../dtos/city-created-response.dto';

export function GetCityByIdSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'City fetched successfully',
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
      summary: 'Get a city by id',
      description: 'Get a city by id',
    }),
  );
}
