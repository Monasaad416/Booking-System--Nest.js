import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { NotificationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { UpsertNotificationSettingsDto } from '../dtos/upsert-settings.dto';
import { NotificationSettings } from '../schema/general-settings.schema';
import { NotificationSettingsRepository } from '../settings.repository';

@Injectable()
export class UpsertNotificationSettingsUseCase {
  constructor(
    private readonly notificationSettingsRepository: NotificationSettingsRepository,
  ) {}

  async execute(
    body: UpsertNotificationSettingsDto,
  ): Promise<NotificationSettingsResponseDto> {
    const current = await this.notificationSettingsRepository.findCurrent();
    const settings = this.merge(current, body);
    const saved = await this.notificationSettingsRepository.save(settings);

    if (!saved) {
      throw new NotFoundCustomException(
        'errors.NOTIFICATION_SETTINGS_NOT_FOUND',
      );
    }

    return mapDocumentResponse(NotificationSettingsResponseDto, saved);
  }

  private merge(
    current: NotificationSettings | null,
    body: UpsertNotificationSettingsDto,
  ) {
    return {
      emailNotificationsEnabled:
        body.emailNotificationsEnabled ??
        current?.emailNotificationsEnabled ??
        true,
      bookingConfirmationEnabled:
        body.bookingConfirmationEnabled ??
        current?.bookingConfirmationEnabled ??
        true,
      bookingCancellationEnabled:
        body.bookingCancellationEnabled ??
        current?.bookingCancellationEnabled ??
        true,
      paymentConfirmationEnabled:
        body.paymentConfirmationEnabled ??
        current?.paymentConfirmationEnabled ??
        true,
      refundNotificationEnabled:
        body.refundNotificationEnabled ??
        current?.refundNotificationEnabled ??
        true,
    };
  }
}
