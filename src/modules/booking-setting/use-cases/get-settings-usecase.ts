import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { BookingSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { BookingSettingsRepository } from '../settings.repository';

@Injectable()
export class GetBookingSettingsUseCase {
  constructor(
    private readonly bookingSettingsRepository: BookingSettingsRepository,
  ) {}

  async execute(): Promise<BookingSettingsResponseDto> {
    const settings = await this.bookingSettingsRepository.findCurrent();

    if (!settings) {
      throw new NotFoundCustomException('errors.BOOKING_SETTINGS_NOT_FOUND');
    }

    return mapDocumentResponse(BookingSettingsResponseDto, settings);
  }
}
