import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import {
  CANCELLATION_SETTINGS_KEY,
  CancellationSettings,
} from './schema/general-settings.schema';

@Injectable()
export class CancellationSettingsRepository extends BaseRepository<CancellationSettings> {
  constructor(
    @InjectModel(ModelNames.CANCELLATION_SETTINGS)
    cancellationSettingsModel: Model<CancellationSettings>,
  ) {
    super(cancellationSettingsModel);
  }

  findCurrent() {
    return this.model
      .findOne({ singletonKey: CANCELLATION_SETTINGS_KEY })
      .exec();
  }

  save(settings: Partial<CancellationSettings>) {
    return this.model
      .findOneAndUpdate(
        { singletonKey: CANCELLATION_SETTINGS_KEY },
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
