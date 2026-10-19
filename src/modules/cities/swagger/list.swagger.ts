import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CityListResponseDto } from '../dtos/list-response.dto';

export function ListCitiesSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Cities fetched successfully',
      type: CityListResponseDto,
    }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({ name: 'limit', required: false, example: 10 }),
    ApiQuery({ name: 'name', required: false }),
    ApiQuery({
      name: 'countryId',
      required: false,
      description: 'Country id',
    }),
    ApiQuery({ name: 'isDeleted', required: false }),
    ApiOperation({
      summary: 'List cities',
      description:
        'List cities with pagination and optional name, countryId, and isDeleted filters.',
    }),
  );
}
