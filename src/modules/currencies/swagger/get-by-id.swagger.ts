import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CurrencyCreatedResponseDto } from '../dtos/currency-created-response.dto';

export function GetCurrencyByIdSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Currency fetched successfully',
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
        invalidCredentials: {
          summary: 'Invalid currency data',
          value: {
            error: [{ message: 'Invalid currency data' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Get a currency by id',
      description: 'Get a currency by id',
    }),
  );
}
