import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import {
  GENERAL_SETTINGS_KEY,
  GeneralSettings,
} from './schema/general-settings.schema';

@Injectable()
export class GeneralSettingsRepository extends BaseRepository<GeneralSettings> {
  constructor(
    @InjectModel(ModelNames.GENERAL_SETTINGS)
    generalSettingsModel: Model<GeneralSettings>,
  ) {
    super(generalSettingsModel);
  }

  findCurrent() {
    return this.model.findOne({ singletonKey: GENERAL_SETTINGS_KEY }).exec();
  }

  save(settings: Partial<GeneralSettings>) {
    return this.model
      .findOneAndUpdate(
        { singletonKey: GENERAL_SETTINGS_KEY },
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
