import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { CancellationSettingsController } from './cancellation-settings.controller';
import { CancellationSettingsService } from './cancellation-settings.service';
import { CancellationSettingsSchema } from './schema/general-settings.schema';
import { CancellationSettingsRepository } from './settings.repository';
import { GetCancellationSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertCancellationSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.CANCELLATION_SETTINGS,
        schema: CancellationSettingsSchema,
      },
    ]),
  ],
  controllers: [CancellationSettingsController],
  providers: [
    CancellationSettingsRepository,
    CancellationSettingsService,
    GetCancellationSettingsUseCase,
    UpsertCancellationSettingsUseCase,
  ],
  exports: [CancellationSettingsService],
})
export class CancellationSettingsModule {}
