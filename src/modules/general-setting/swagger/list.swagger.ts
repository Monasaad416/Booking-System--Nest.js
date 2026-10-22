import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SettingsUpsertedResponseDto } from '../dtos/settings-upserted-response.dto';

export function GetGeneralSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get general settings',
      description: 'Returns the current general settings.',
    }),
    ApiOkResponse({
      description: 'General settings fetched successfully',
      type: SettingsUpsertedResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'General settings have not been created yet.',
    }),
  );
}
