import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UnitCategoryUpdatedResponseDto } from '../dtos/unit-category-updated-response.dto';

export function UpdateUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a unit category',
      description: 'Update an active unit category',
    }),
    ApiOkResponse({
      description: 'Unit category updated successfully',
      type: UnitCategoryUpdatedResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid unit category data or the name already exists.',
    }),
    ApiNotFoundResponse({
      description: 'Unit category not found.',
    }),
  );
}
