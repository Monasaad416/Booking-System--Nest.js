import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CancellationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { UpsertCancellationSettingsDto } from '../dtos/upsert-settings.dto';
import { CancellationSettings } from '../schema/general-settings.schema';
import { CancellationSettingsRepository } from '../settings.repository';

@Injectable()
export class UpsertCancellationSettingsUseCase {
  constructor(
    private readonly cancellationSettingsRepository: CancellationSettingsRepository,
  ) {}

  async execute(
    body: UpsertCancellationSettingsDto,
  ): Promise<CancellationSettingsResponseDto> {
    const current = await this.cancellationSettingsRepository.findCurrent();
    const settings = this.merge(current, body);
    const saved = await this.cancellationSettingsRepository.save(settings);

    if (!saved) {
      throw new NotFoundCustomException(
        'errors.CANCELLATION_SETTINGS_NOT_FOUND',
      );
    }

    return mapDocumentResponse(CancellationSettingsResponseDto, saved);
  }

  private merge(
    current: CancellationSettings | null,
    body: UpsertCancellationSettingsDto,
  ) {
    return {
      cancellationAllowed:
        body.cancellationAllowed ?? current?.cancellationAllowed ?? true,
      freeCancellationHours:
        body.freeCancellationHours ?? current?.freeCancellationHours ?? 48,
      cancellationFeeRate:
        body.cancellationFeeRate ?? current?.cancellationFeeRate ?? 0,
      refundProcessingDays:
        body.refundProcessingDays ?? current?.refundProcessingDays ?? 7,
    };
  }
}
