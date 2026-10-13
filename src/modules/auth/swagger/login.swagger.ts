import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function LoginSwagger() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'User logged in successfully',
      type: AuthResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid credentials or validation error.',
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
          summary: 'Invalid credentials',
          value: {
            error: [{ message: 'Invalid credentials' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Login a user',
      description: 'Login a user',
    }),
  );
}
