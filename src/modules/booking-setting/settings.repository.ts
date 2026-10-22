import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import {
  BOOKING_SETTINGS_KEY,
  BookingSettings,
} from './schema/general-settings.schema';

@Injectable()
export class BookingSettingsRepository extends BaseRepository<BookingSettings> {
  constructor(
    @InjectModel(ModelNames.BOOKING_SETTINGS)
    bookingSettingsModel: Model<BookingSettings>,
  ) {
    super(bookingSettingsModel);
  }

  findCurrent() {
    return this.model.findOne({ singletonKey: BOOKING_SETTINGS_KEY }).exec();
  }

  save(settings: Partial<BookingSettings>) {
    return this.model
      .findOneAndUpdate(
        { singletonKey: BOOKING_SETTINGS_KEY },
        { $set: settings },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      )
      .exec();
  }
}
