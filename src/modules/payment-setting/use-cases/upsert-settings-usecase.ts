import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { PaymentSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { UpsertPaymentSettingsDto } from '../dtos/upsert-settings.dto';
import { PaymentSettings } from '../schema/general-settings.schema';
import { PaymentSettingsRepository } from '../settings.repository';

@Injectable()
export class UpsertPaymentSettingsUseCase {
  constructor(
    private readonly paymentSettingsRepository: PaymentSettingsRepository,
  ) {}

  async execute(
    body: UpsertPaymentSettingsDto,
  ): Promise<PaymentSettingsResponseDto> {
    const current = await this.paymentSettingsRepository.findCurrent();
    const settings = this.merge(current, body);

    if (settings.minimumOrderAmount > settings.maximumOrderAmount) {
      throw new BadRequestCustomException(
        'errors.PAYMENT_ORDER_AMOUNT_RANGE_INVALID',
      );
    }

    const saved = await this.paymentSettingsRepository.save(settings);

    if (!saved) {
      throw new NotFoundCustomException('errors.PAYMENT_SETTINGS_NOT_FOUND');
    }

    return mapDocumentResponse(PaymentSettingsResponseDto, saved);
  }

  private merge(
    current: PaymentSettings | null,
    body: UpsertPaymentSettingsDto,
  ) {
    return {
      vatRate: body.vatRate ?? current?.vatRate ?? 0,
      guestServiceFeeRate:
        body.guestServiceFeeRate ?? current?.guestServiceFeeRate ?? 0,
      hostServiceFeeRate:
        body.hostServiceFeeRate ?? current?.hostServiceFeeRate ?? 0,
      minimumOrderAmount:
        body.minimumOrderAmount ?? current?.minimumOrderAmount ?? 0,
      maximumOrderAmount:
        body.maximumOrderAmount ?? current?.maximumOrderAmount ?? 100000,
    };
  }
}
