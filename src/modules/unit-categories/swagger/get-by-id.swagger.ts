import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UnitCategoryCreatedResponseDto } from '../dtos/unit-category-created-response.dto';

export function GetUnitCategoryByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a unit category by id',
      description: 'Get an active unit category by id',
    }),
    ApiOkResponse({
      description: 'Unit category fetched successfully',
      type: UnitCategoryCreatedResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Unit category not found.',
    }),
  );
}
