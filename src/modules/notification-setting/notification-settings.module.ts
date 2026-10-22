import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { NotificationSettingsController } from './notification-settings.controller';
import { NotificationSettingsService } from './notification-settings.service';
import { NotificationSettingsSchema } from './schema/general-settings.schema';
import { NotificationSettingsRepository } from './settings.repository';
import { GetNotificationSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertNotificationSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.NOTIFICATION_SETTINGS,
        schema: NotificationSettingsSchema,
      },
    ]),
  ],
  controllers: [NotificationSettingsController],
  providers: [
    NotificationSettingsRepository,
    NotificationSettingsService,
    GetNotificationSettingsUseCase,
    UpsertNotificationSettingsUseCase,
  ],
  exports: [NotificationSettingsService],
})
export class NotificationSettingsModule {}
