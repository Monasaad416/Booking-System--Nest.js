import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import {
  PAYMENT_SETTINGS_KEY,
  PaymentSettings,
} from './schema/general-settings.schema';

@Injectable()
export class PaymentSettingsRepository extends BaseRepository<PaymentSettings> {
  constructor(
    @InjectModel(ModelNames.PAYMENT_SETTINGS)
    paymentSettingsModel: Model<PaymentSettings>,
  ) {
    super(paymentSettingsModel);
  }

  findCurrent() {
    return this.model.findOne({ singletonKey: PAYMENT_SETTINGS_KEY }).exec();
  }

  save(settings: Partial<PaymentSettings>) {
    return this.model
      .findOneAndUpdate(
        { singletonKey: PAYMENT_SETTINGS_KEY },
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
