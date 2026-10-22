import { Injectable } from '@nestjs/common';
import { NotificationSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertNotificationSettingsDto } from './dtos/upsert-settings.dto';
import { GetNotificationSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertNotificationSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Injectable()
export class NotificationSettingsService {
  constructor(
    private readonly getNotificationSettingsUseCase: GetNotificationSettingsUseCase,
    private readonly upsertNotificationSettingsUseCase: UpsertNotificationSettingsUseCase,
  ) {}

  getNotificationSettings(): Promise<NotificationSettingsResponseDto> {
    return this.getNotificationSettingsUseCase.execute();
  }

  upsertNotificationSettings(
    body: UpsertNotificationSettingsDto,
  ): Promise<NotificationSettingsResponseDto> {
    return this.upsertNotificationSettingsUseCase.execute(body);
  }
}
