import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTags } from '../../common/swagger';
import { NotificationSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertNotificationSettingsDto } from './dtos/upsert-settings.dto';
import { NotificationSettingsService } from './notification-settings.service';
import { GetNotificationSettingsSwagger } from './swagger/list.swagger';
import { UpsertNotificationSettingsSwagger } from './swagger/upsert.swagger';

@ApiTags(SwaggerApiTags.NOTIFICATION_SETTINGS)
@Controller('notification-settings')
export class NotificationSettingsController {
  constructor(
    private readonly notificationSettingsService: NotificationSettingsService,
  ) {}

  @Get()
  @GetNotificationSettingsSwagger()
  getNotificationSettings(): Promise<NotificationSettingsResponseDto> {
    return this.notificationSettingsService.getNotificationSettings();
  }

  @Put()
  @UpsertNotificationSettingsSwagger()
  upsertNotificationSettings(
    @Body() body: UpsertNotificationSettingsDto,
  ): Promise<NotificationSettingsResponseDto> {
    return this.notificationSettingsService.upsertNotificationSettings(body);
  }
}
