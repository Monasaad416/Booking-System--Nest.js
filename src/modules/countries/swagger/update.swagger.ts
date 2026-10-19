import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CountryUpdatedResponseDto } from '../dtos/country-updated-response.dto';

export function UpdateCountrySwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Country updated successfully',
      type: CountryUpdatedResponseDto,
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
      summary: 'Update a country',
      description: 'Update a country',
    }),
  );
}
