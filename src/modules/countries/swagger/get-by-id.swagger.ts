import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CountryCreatedResponseDto } from '../dtos/country-created-response.dto';

export function GetCountryByIdSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Country fetched successfully',
      type: CountryCreatedResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid country data or validation error.',
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
          summary: 'Invalid country data',
          value: {
            error: [{ message: 'Invalid country data' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Get a country by id',
      description: 'Get a country by id',
    }),
  );
}
