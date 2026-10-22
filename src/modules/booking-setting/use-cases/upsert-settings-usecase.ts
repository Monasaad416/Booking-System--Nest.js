import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { BookingSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { UpsertBookingSettingsDto } from '../dtos/upsert-settings.dto';
import { BookingSettings } from '../schema/general-settings.schema';
import { BookingSettingsRepository } from '../settings.repository';

@Injectable()
export class UpsertBookingSettingsUseCase {
  constructor(
    private readonly bookingSettingsRepository: BookingSettingsRepository,
  ) {}

  async execute(
    body: UpsertBookingSettingsDto,
  ): Promise<BookingSettingsResponseDto> {
    const current = await this.bookingSettingsRepository.findCurrent();
    const settings = this.merge(current, body);

    if (settings.minimumBookingNights > settings.maximumBookingNights) {
      throw new BadRequestCustomException(
        'errors.BOOKING_NIGHTS_RANGE_INVALID',
      );
    }

    const saved = await this.bookingSettingsRepository.save(settings);

    if (!saved) {
      throw new NotFoundCustomException('errors.BOOKING_SETTINGS_NOT_FOUND');
    }

    return mapDocumentResponse(BookingSettingsResponseDto, saved);
  }

  private merge(
    current: BookingSettings | null,
    body: UpsertBookingSettingsDto,
  ) {
    return {
      minimumBookingNights:
        body.minimumBookingNights ?? current?.minimumBookingNights ?? 1,
      maximumBookingNights:
        body.maximumBookingNights ?? current?.maximumBookingNights ?? 90,
      minimumAdvanceBookingHours:
        body.minimumAdvanceBookingHours ??
        current?.minimumAdvanceBookingHours ??
        24,
      maximumAdvanceBookingDays:
        body.maximumAdvanceBookingDays ??
        current?.maximumAdvanceBookingDays ??
        365,
      maximumGuestsPerBooking:
        body.maximumGuestsPerBooking ?? current?.maximumGuestsPerBooking ?? 10,
    };
  }
}
