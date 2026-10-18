import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CountryListResponseDto } from '../dtos/list-response.dto';

export function ListCountriesSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Countries fetched successfully',
      type: CountryListResponseDto,
    }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({ name: 'limit', required: false, example: 10 }),
    ApiQuery({ name: 'name', required: false, example: 'Egypt' }),
    ApiQuery({ name: 'code', required: false, example: 'EG' }),
    ApiQuery({ name: 'isDeleted', required: false, example: false }),
    ApiOperation({
      summary: 'List countries',
      description:
        'List countries with pagination and optional name, code, and isDeleted filters.',
    }),
  );
}
