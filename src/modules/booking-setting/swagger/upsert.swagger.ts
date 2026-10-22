import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BookingSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function UpsertBookingSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create or update booking settings',
      description:
        'Updates the one booking settings record. The first save creates it. Later saves update that same record. Omitted fields keep their current value, or the schema default on the first save.',
    }),
    ApiOkResponse({
      description: 'Booking settings updated successfully',
      type: BookingSettingsResponseDto,
    }),
    ApiBadRequestResponse({
      description:
        'Invalid booking settings, or minimum nights are greater than maximum nights.',
    }),
  );
}
