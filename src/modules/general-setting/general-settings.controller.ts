import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTags } from '../../common/swagger';
import { SettingsUpsertedResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertSettingsDto } from './dtos/upsert-settings.dto';
import { GeneralSettingsService } from './general-settings.service';
import { GetGeneralSettingsSwagger } from './swagger/list.swagger';
import { UpsertGeneralSettingsSwagger } from './swagger/upsert.swagger';

@ApiTags(SwaggerApiTags.GENERAL_SETTINGS)
@Controller('general-settings')
export class GeneralSettingsController {
  constructor(
    private readonly generalSettingsService: GeneralSettingsService,
  ) {}

  @Get()
  @GetGeneralSettingsSwagger()
  getGeneralSettings(): Promise<SettingsUpsertedResponseDto> {
    return this.generalSettingsService.getGeneralSettings();
  }

  @Put()
  @UpsertGeneralSettingsSwagger()
  upsertGeneralSettings(
    @Body() body: UpsertSettingsDto,
  ): Promise<SettingsUpsertedResponseDto> {
    return this.generalSettingsService.upsertGeneralSettings(body);
  }
}
