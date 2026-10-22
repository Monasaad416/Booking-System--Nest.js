import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTags } from '../../common/swagger';
import { BookingSettingsService } from './booking-settings.service';
import { BookingSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertBookingSettingsDto } from './dtos/upsert-settings.dto';
import { GetBookingSettingsSwagger } from './swagger/list.swagger';
import { UpsertBookingSettingsSwagger } from './swagger/upsert.swagger';

@ApiTags(SwaggerApiTags.BOOKING_SETTINGS)
@Controller('booking-settings')
export class BookingSettingsController {
  constructor(
    private readonly bookingSettingsService: BookingSettingsService,
  ) {}

  @Get()
  @GetBookingSettingsSwagger()
  getBookingSettings(): Promise<BookingSettingsResponseDto> {
    return this.bookingSettingsService.getBookingSettings();
  }

  @Put()
  @UpsertBookingSettingsSwagger()
  upsertBookingSettings(
    @Body() body: UpsertBookingSettingsDto,
  ): Promise<BookingSettingsResponseDto> {
    return this.bookingSettingsService.upsertBookingSettings(body);
  }
}
