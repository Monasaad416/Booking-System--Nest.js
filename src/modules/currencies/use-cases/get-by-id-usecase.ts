import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { CurrencyRepository } from '../currency.repository';
import { CurrencyCreatedResponseDto } from '../dtos/currency-created-response.dto';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';

@Injectable()
export class GetCurrencyByIdUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(id: string): Promise<CurrencyCreatedResponseDto> {
    const currency = await this.currencyRepository.findActiveById(id);

    if (!currency) {
      throw new NotFoundCustomException('errors.CURRENCY_NOT_FOUND');
    }

    return mapDocumentResponse(CurrencyCreatedResponseDto, currency);
  }
}
