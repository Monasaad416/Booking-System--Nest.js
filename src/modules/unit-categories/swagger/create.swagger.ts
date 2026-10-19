import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UnitCategoryCreatedResponseDto } from '../dtos/unit-category-created-response.dto';

export function CreateUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a unit category',
      description: 'Create a unit category',
    }),
    ApiCreatedResponse({
      description: 'Unit category created successfully',
      type: UnitCategoryCreatedResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid unit category data or the name already exists.',
    }),
  );
}
