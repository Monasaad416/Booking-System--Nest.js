import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CancellationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';
import { CancellationSettingsRepository } from '../settings.repository';

@Injectable()
export class GetCancellationSettingsUseCase {
  constructor(
    private readonly cancellationSettingsRepository: CancellationSettingsRepository,
  ) {}

  async execute(): Promise<CancellationSettingsResponseDto> {
    const settings = await this.cancellationSettingsRepository.findCurrent();

    if (!settings) {
      throw new NotFoundCustomException(
        'errors.CANCELLATION_SETTINGS_NOT_FOUND',
      );
    }

    return mapDocumentResponse(CancellationSettingsResponseDto, settings);
  }
}
