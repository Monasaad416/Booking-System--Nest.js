import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PaymentSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function UpsertPaymentSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create or update payment settings',
      description:
        'Updates the one payment settings record. The first save creates it. Later saves update that same record. Omitted fields keep their current value, or the schema default on the first save.',
    }),
    ApiOkResponse({
      description: 'Payment settings updated successfully',
      type: PaymentSettingsResponseDto,
    }),
    ApiBadRequestResponse({
      description:
        'Invalid payment settings, or the minimum order amount is greater than the maximum order amount.',
    }),
  );
}
