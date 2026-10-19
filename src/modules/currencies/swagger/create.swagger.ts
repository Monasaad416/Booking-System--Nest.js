import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CurrencyCreatedResponseDto } from '../dtos/currency-created-response.dto';

export function CreateCurrencySwagger() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'Currency created successfully',
      type: CurrencyCreatedResponseDto,
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
        invalidCurrencyData: {
          summary: 'Invalid currency data',
          value: {
            error: [{ message: 'Invalid currency data' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Create a new currency',
      description: 'Create a new currency',
    }),
  );
}
