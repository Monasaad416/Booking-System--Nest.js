import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CurrencyListResponseDto } from '../dtos/list-response.dto';

export function ListCurrenciesSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Currencies fetched successfully',
      type: CurrencyListResponseDto,
    }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({ name: 'limit', required: false, example: 10 }),
    ApiQuery({ name: 'name', required: false }),
    ApiQuery({ name: 'code', required: false }),
    ApiQuery({ name: 'isDeleted', required: false }),
    ApiOperation({
      summary: 'List currencies',
      description:
        'List currencies with pagination and optional name, code, and isActive filters.',
    }),
  );
}
