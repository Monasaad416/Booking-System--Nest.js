import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTags } from '../../common/swagger';
import { CancellationSettingsService } from './cancellation-settings.service';
import { CancellationSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertCancellationSettingsDto } from './dtos/upsert-settings.dto';
import { GetCancellationSettingsSwagger } from './swagger/list.swagger';
import { UpsertCancellationSettingsSwagger } from './swagger/upsert.swagger';

@ApiTags(SwaggerApiTags.CANCELLATION_SETTINGS)
@Controller('cancellation-settings')
export class CancellationSettingsController {
  constructor(
    private readonly cancellationSettingsService: CancellationSettingsService,
  ) {}

  @Get()
  @GetCancellationSettingsSwagger()
  getCancellationSettings(): Promise<CancellationSettingsResponseDto> {
    return this.cancellationSettingsService.getCancellationSettings();
  }

  @Put()
  @UpsertCancellationSettingsSwagger()
  upsertCancellationSettings(
    @Body() body: UpsertCancellationSettingsDto,
  ): Promise<CancellationSettingsResponseDto> {
    return this.cancellationSettingsService.upsertCancellationSettings(body);
  }
}
