import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTags } from '../../common/swagger';
import { PaymentSettingsResponseDto } from './dtos/settings-upserted-response.dto';
import { UpsertPaymentSettingsDto } from './dtos/upsert-settings.dto';
import { PaymentSettingsService } from './payment-settings.service';
import { GetPaymentSettingsSwagger } from './swagger/list.swagger';
import { UpsertPaymentSettingsSwagger } from './swagger/upsert.swagger';

@ApiTags(SwaggerApiTags.PAYMENT_SETTINGS)
@Controller('payment-settings')
export class PaymentSettingsController {
  constructor(
    private readonly paymentSettingsService: PaymentSettingsService,
  ) {}

  @Get()
  @GetPaymentSettingsSwagger()
  getPaymentSettings(): Promise<PaymentSettingsResponseDto> {
    return this.paymentSettingsService.getPaymentSettings();
  }

  @Put()
  @UpsertPaymentSettingsSwagger()
  upsertPaymentSettings(
    @Body() body: UpsertPaymentSettingsDto,
  ): Promise<PaymentSettingsResponseDto> {
    return this.paymentSettingsService.upsertPaymentSettings(body);
  }
}
