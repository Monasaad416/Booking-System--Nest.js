import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { PaymentSettingsController } from './payment-settings.controller';
import { PaymentSettingsService } from './payment-settings.service';
import { PaymentSettingsSchema } from './schema/general-settings.schema';
import { PaymentSettingsRepository } from './settings.repository';
import { GetPaymentSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertPaymentSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.PAYMENT_SETTINGS,
        schema: PaymentSettingsSchema,
      },
    ]),
  ],
  controllers: [PaymentSettingsController],
  providers: [
    PaymentSettingsRepository,
    PaymentSettingsService,
    GetPaymentSettingsUseCase,
    UpsertPaymentSettingsUseCase,
  ],
  exports: [PaymentSettingsService],
})
export class PaymentSettingsModule {}
