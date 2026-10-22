import { Injectable } from '@nestjs/common';
import { CancellationSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertCancellationSettingsDto } from './dtos/upsert-settings.dto';
import { GetCancellationSettingsUseCase } from './use-cases/get-settings-usecase';
import { UpsertCancellationSettingsUseCase } from './use-cases/upsert-settings-usecase';

@Injectable()
export class CancellationSettingsService {
  constructor(
    private readonly getCancellationSettingsUseCase: GetCancellationSettingsUseCase,
    private readonly upsertCancellationSettingsUseCase: UpsertCancellationSettingsUseCase,
  ) {}

  getCancellationSettings(): Promise<CancellationSettingsResponseDto> {
    return this.getCancellationSettingsUseCase.execute();
  }

  upsertCancellationSettings(
    body: UpsertCancellationSettingsDto,
  ): Promise<CancellationSettingsResponseDto> {
    return this.upsertCancellationSettingsUseCase.execute(body);
  }
}
