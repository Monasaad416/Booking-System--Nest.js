import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import {
  NOTIFICATION_SETTINGS_KEY,
  NotificationSettings,
} from './schema/general-settings.schema';

@Injectable()
export class NotificationSettingsRepository extends BaseRepository<NotificationSettings> {
  constructor(
    @InjectModel(ModelNames.NOTIFICATION_SETTINGS)
    notificationSettingsModel: Model<NotificationSettings>,
  ) {
    super(notificationSettingsModel);
  }

  findCurrent() {
    return this.model
      .findOne({ singletonKey: NOTIFICATION_SETTINGS_KEY })
      .exec();
  }

  save(settings: Partial<NotificationSettings>) {
    return this.model
      .findOneAndUpdate(
        { singletonKey: NOTIFICATION_SETTINGS_KEY },
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
