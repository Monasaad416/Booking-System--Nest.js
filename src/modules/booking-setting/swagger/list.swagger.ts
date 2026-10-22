import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BookingSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function GetBookingSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get booking settings',
      description: 'Returns the current booking settings.',
    }),
    ApiOkResponse({
      description: 'Booking settings fetched successfully',
      type: BookingSettingsResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Booking settings have not been created yet.',
    }),
  );
}
