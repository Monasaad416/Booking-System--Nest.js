import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { NotificationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { NotificationSettingsRepository } from '../settings.repository';

@Injectable()
export class GetNotificationSettingsUseCase {
  constructor(
    private readonly notificationSettingsRepository: NotificationSettingsRepository,
  ) {}

  async execute(): Promise<NotificationSettingsResponseDto> {
    const settings = await this.notificationSettingsRepository.findCurrent();

    if (!settings) {
      throw new NotFoundCustomException(
        'errors.NOTIFICATION_SETTINGS_NOT_FOUND',
      );
    }

    return mapDocumentResponse(NotificationSettingsResponseDto, settings);
  }
}
