import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CurrencyRepository } from '../../currencies/currency.repository';
import { SettingsUpsertedResponseDto } from '../dtos/settings-upserted-response.dto';
import { UpsertSettingsDto } from '../dtos/upsert-settings.dto';
import { GeneralSettings } from '../schema/general-settings.schema';
import { GeneralSettingsRepository } from '../settings.repository';

type SettingsDraft = {
  appName?: string;
  defaultCurrency?: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  timezone: string;
  maintenanceMode: boolean;
};

@Injectable()
export class UpsertGeneralSettingsUseCase {
  constructor(
    private readonly generalSettingsRepository: GeneralSettingsRepository,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  async execute(body: UpsertSettingsDto): Promise<SettingsUpsertedResponseDto> {
    const current = await this.generalSettingsRepository.findCurrent();
    const next = this.merge(current, body);

    if (!next.appName) {
      throw new BadRequestCustomException(
        'errors.GENERAL_SETTINGS_APP_NAME_REQUIRED',
      );
    }

    if (!next.defaultCurrency) {
      throw new BadRequestCustomException(
        'errors.GENERAL_SETTINGS_CURRENCY_REQUIRED',
      );
    }

    const defaultCurrency = next.defaultCurrency;
    const settings = {
      appName: next.appName,
      defaultCurrency,
      defaultLanguage: next.defaultLanguage,
      supportedLanguages: next.supportedLanguages,
      timezone: next.timezone,
      maintenanceMode: next.maintenanceMode,
    };
    await this.assertValid(settings);

    const saved = await this.generalSettingsRepository.save(settings);

    if (!saved) {
      throw new NotFoundCustomException('errors.GENERAL_SETTINGS_NOT_FOUND');
    }

    return mapDocumentResponse(SettingsUpsertedResponseDto, saved);
  }

  private merge(
    current: GeneralSettings | null,
    body: UpsertSettingsDto,
  ): SettingsDraft {
    const supportedLanguages = [
      ...new Set(
        body.supportedLanguages ?? current?.supportedLanguages ?? ['en', 'ar'],
      ),
    ];

    return {
      appName: body.appName?.trim() || current?.appName,
      defaultCurrency: body.defaultCurrency ?? current?.defaultCurrency,
      defaultLanguage: body.defaultLanguage ?? current?.defaultLanguage ?? 'en',
      supportedLanguages,
      timezone: body.timezone?.trim() || current?.timezone || 'UTC',
      maintenanceMode:
        body.maintenanceMode !== undefined
          ? body.maintenanceMode
          : (current?.maintenanceMode ?? false),
    };
  }

  private async assertValid(
    next: SettingsDraft & { defaultCurrency: string },
  ): Promise<void> {
    const currency = await this.currencyRepository.findActiveByCode(
      next.defaultCurrency,
    );
    if (!currency) {
      throw new NotFoundCustomException('errors.CURRENCY_NOT_FOUND');
    }

    if (!next.supportedLanguages.includes(next.defaultLanguage)) {
      throw new BadRequestCustomException(
        'errors.DEFAULT_LANGUAGE_NOT_SUPPORTED',
      );
    }
  }
}
