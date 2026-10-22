import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CancellationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function GetCancellationSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get cancellation settings',
      description: 'Returns the current cancellation settings.',
    }),
    ApiOkResponse({
      description: 'Cancellation settings fetched successfully',
      type: CancellationSettingsResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Cancellation settings have not been created yet.',
    }),
  );
}
