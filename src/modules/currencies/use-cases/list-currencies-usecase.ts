import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CurrencyRepository } from '../currency.repository';
import { CurrencyCreatedResponseDto } from '../dtos/currency-created-response.dto';
import { ListCurrenciesQueryDto } from '../dtos/list-currencies-query.dto';
import { CurrencyListResponseDto } from '../dtos/list-response.dto';

@Injectable()
export class ListCurrenciesUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    query: ListCurrenciesQueryDto,
  ): Promise<CurrencyListResponseDto> {
    const { documents, page, limit, total, totalPages } =
      await this.currencyRepository.findPaginated(query);

    return plainToInstance(
      CurrencyListResponseDto,
      {
        currencies: documents.map((currency) =>
          mapDocumentResponse(CurrencyCreatedResponseDto, currency),
        ),
        page,
        limit,
        total,
        totalPages,
      },
      { excludeExtraneousValues: true },
    );
  }
}
