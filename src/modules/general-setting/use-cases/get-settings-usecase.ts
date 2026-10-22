import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { SettingsUpsertedResponseDto } from '../dtos/settings-upserted-response.dto';
import { GeneralSettingsRepository } from '../settings.repository';

@Injectable()
export class GetGeneralSettingsUseCase {
  constructor(
    private readonly generalSettingsRepository: GeneralSettingsRepository,
  ) {}

  async execute(): Promise<SettingsUpsertedResponseDto> {
    const settings = await this.generalSettingsRepository.findCurrent();

    if (!settings) {
      throw new NotFoundCustomException('errors.GENERAL_SETTINGS_NOT_FOUND');
    }

    return mapDocumentResponse(SettingsUpsertedResponseDto, settings);
  }
}
