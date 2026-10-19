import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UnitCategoryListResponseDto } from '../dtos/list-response.dto';

export function ListUnitCategoriesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'List unit categories',
      description:
        'List unit categories with pagination and optional name and isActive filters.',
    }),
    ApiOkResponse({
      description: 'Unit categories fetched successfully',
      type: UnitCategoryListResponseDto,
    }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({ name: 'limit', required: false, example: 10 }),
    ApiQuery({ name: 'name', required: false }),
    ApiQuery({ name: 'isActive', required: false }),
  );
}
