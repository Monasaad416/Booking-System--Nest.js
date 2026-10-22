import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SettingsUpsertedResponseDto } from '../dtos/settings-upserted-response.dto';

export function UpsertGeneralSettingsSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'General settings updated successfully',
      type: SettingsUpsertedResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid general settings data or validation error.',
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
          summary: 'Invalid general settings data',
          value: {
            error: [{ message: 'Invalid general settings data' }],
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'General settings have not been created yet.',
    }),
    ApiOperation({
      summary: 'Upsert general settings',
      description:
        'Updates the one general settings record. The first save creates it. Every later save updates that same record. The first save requires an application name and a default currency code. The default language must be included in the supported languages.',
    }),
  );
}
