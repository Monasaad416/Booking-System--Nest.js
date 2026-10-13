import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function RegisterSwagger() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'User registered successfully',
      type: AuthResponseDto,
    }),
    ApiBadRequestResponse({
      description:
        'Email already exists, phone number already exists, or validation error.',
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
        emailAlreadyExists: {
          summary: 'Email already exists',
          value: {
            error: [{ message: 'Email already exists' }],
          },
        },
        phoneNumberAlreadyExists: {
          summary: 'Phone number already exists',
          value: {
            error: [{ message: 'Phone number already exists' }],
          },
        },
      },
    }),
    ApiOperation({
      summary: 'Register a new user',
      description: 'Register a new user',
    }),
  );
}
