import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { CurrenciesModule } from '../currencies/currency.module';
import { GeneralSettingsController } from './general-settings.controller';
import { GeneralSettingsService } from './general-settings.service';
import { GeneralSettingsSchema } from './schema/general-settings.schema';
import { GeneralSettingsRepository } from './settings.repository';
import { GetGeneralSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertGeneralSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.GENERAL_SETTINGS,
        schema: GeneralSettingsSchema,
      },
    ]),
    CurrenciesModule,
  ],
  controllers: [GeneralSettingsController],
  providers: [
    GeneralSettingsRepository,
    GeneralSettingsService,
    GetGeneralSettingsUseCase,
    UpsertGeneralSettingsUseCase,
  ],
  exports: [GeneralSettingsService],
})
export class GeneralSettingsModule {}
