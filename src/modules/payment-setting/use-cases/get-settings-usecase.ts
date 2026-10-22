import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { PaymentSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { PaymentSettingsRepository } from '../settings.repository';

@Injectable()
export class GetPaymentSettingsUseCase {
  constructor(
    private readonly paymentSettingsRepository: PaymentSettingsRepository,
  ) {}

  async execute(): Promise<PaymentSettingsResponseDto> {
    const settings = await this.paymentSettingsRepository.findCurrent();

    if (!settings) {
      throw new NotFoundCustomException('errors.PAYMENT_SETTINGS_NOT_FOUND');
    }

    return mapDocumentResponse(PaymentSettingsResponseDto, settings);
  }
}
