import { Injectable } from '@nestjs/common';
import { SettingsUpsertedResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertSettingsDto } from './dtos/upsert-settings.dto';
import { GetGeneralSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertGeneralSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Injectable()
export class GeneralSettingsService {
  constructor(
    private readonly getGeneralSettingsUseCase: GetGeneralSettingsUseCase,
    private readonly upsertGeneralSettingsUseCase: UpsertGeneralSettingsUseCase,
  ) {}

  getGeneralSettings(): Promise<SettingsUpsertedResponseDto> {
    return this.getGeneralSettingsUseCase.execute();
  }

  upsertGeneralSettings(
    body: UpsertSettingsDto,
  ): Promise<SettingsUpsertedResponseDto> {
    return this.upsertGeneralSettingsUseCase.execute(body);
  }
}
