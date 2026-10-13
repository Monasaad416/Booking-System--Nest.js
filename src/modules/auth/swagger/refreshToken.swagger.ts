import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function RefreshTokenSwagger() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'Token refreshed successfully',
      type: AuthResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid token or validation error.',
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
        invalidToken: {
          summary: 'Invalid token',
          value: {
            error: [{ message: 'Invalid token' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Refresh a token',
      description: 'Refresh a token',
    }),
  );
}
