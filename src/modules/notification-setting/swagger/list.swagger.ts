import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { NotificationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function GetNotificationSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get notification settings',
      description: 'Returns the current notification settings.',
    }),
    ApiOkResponse({
      description: 'Notification settings fetched successfully',
      type: NotificationSettingsResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Notification settings have not been created yet.',
    }),
  );
}
