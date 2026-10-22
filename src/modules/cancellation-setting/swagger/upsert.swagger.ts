import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CancellationSettingsResponseDto } from '../dtos/settings-upserted-response.dto';

export function UpsertCancellationSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create or update cancellation settings',
      description:
        'Updates the one cancellation settings record. The first save creates it. Later saves update that same record. Omitted fields keep their current value, or the schema default on the first save.',
    }),
    ApiOkResponse({
      description: 'Cancellation settings updated successfully',
      type: CancellationSettingsResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid cancellation settings.',
    }),
  );
}
