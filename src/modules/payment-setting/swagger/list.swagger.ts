import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PaymentSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function GetPaymentSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get payment settings',
      description: 'Returns the current payment settings.',
    }),
    ApiOkResponse({
      description: 'Payment settings fetched successfully',
      type: PaymentSettingsResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Payment settings have not been created yet.',
    }),
  );
}
