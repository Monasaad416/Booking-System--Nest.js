import { Injectable } from '@nestjs/common';
import { BookingSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertBookingSettingsDto } from './dtos/upsert-settings.dto';
import { GetBookingSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertBookingSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Injectable()
export class BookingSettingsService {
  constructor(
    private readonly getBookingSettingsUseCase: GetBookingSettingsUseCase,
    private readonly upsertBookingSettingsUseCase: UpsertBookingSettingsUseCase,
  ) {}

  getBookingSettings(): Promise<BookingSettingsResponseDto> {
    return this.getBookingSettingsUseCase.execute();
  }

  upsertBookingSettings(
    body: UpsertBookingSettingsDto,
  ): Promise<BookingSettingsResponseDto> {
    return this.upsertBookingSettingsUseCase.execute(body);
  }
}
