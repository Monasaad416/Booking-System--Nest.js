import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { NotificationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function UpsertNotificationSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create or update notification settings',
      description:
        'Updates the one notification settings record. The first save creates it. Later saves update that same record. Omitted fields keep their current value, or the schema default on the first save.',
    }),
    ApiOkResponse({
      description: 'Notification settings updated successfully',
      type: NotificationSettingsResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid notification settings.',
    }),
  );
}
