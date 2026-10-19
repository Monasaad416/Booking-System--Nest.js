import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CurrencyUpdatedResponseDto } from '../dtos/currency-updated-response.dto';

export function UpdateCurrencySwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Currency updated successfully',
      type: CurrencyUpdatedResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid currency data or validation error.',
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
          summary: 'Invalid currency data',
          value: {
            error: [{ message: 'Invalid currency data' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Update a currency',
      description: 'Update a currency',
    }),
  );
}
