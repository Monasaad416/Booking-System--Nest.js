import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BookingSettingsController } from './booking-settings.controller';
import { BookingSettingsService } from './booking-settings.service';
import { BookingSettingsSchema } from './schema/general-settings.schema';
import { BookingSettingsRepository } from './settings.repository';
import { GetBookingSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertBookingSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.BOOKING_SETTINGS,
        schema: BookingSettingsSchema,
      },
    ]),
  ],
  controllers: [BookingSettingsController],
  providers: [
    BookingSettingsRepository,
    BookingSettingsService,
    GetBookingSettingsUseCase,
    UpsertBookingSettingsUseCase,
  ],
  exports: [BookingSettingsService],
})
export class BookingSettingsModule {}
