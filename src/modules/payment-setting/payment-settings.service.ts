import { Injectable } from '@nestjs/common';
import { PaymentSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertPaymentSettingsDto } from './dtos/upsert-settings.dto';
import { GetPaymentSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertPaymentSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Injectable()
export class PaymentSettingsService {
  constructor(
    private readonly getPaymentSettingsUseCase: GetPaymentSettingsUseCase,
    private readonly upsertPaymentSettingsUseCase: UpsertPaymentSettingsUseCase,
  ) {}

  getPaymentSettings(): Promise<PaymentSettingsResponseDto> {
    return this.getPaymentSettingsUseCase.execute();
  }

  upsertPaymentSettings(
    body: UpsertPaymentSettingsDto,
  ): Promise<PaymentSettingsResponseDto> {
    return this.upsertPaymentSettingsUseCase.execute(body);
  }
}
