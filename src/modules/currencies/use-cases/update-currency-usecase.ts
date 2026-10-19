import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CurrencyRepository } from '../currency.repository';
import { AssertCurrencyUnique } from './assert-currency-unique';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { CurrencyUpdatedResponseDto } from '../dtos/currency-updated-response.dto';

@Injectable()
export class UpdateCurrencyUseCase {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly assertCurrencyUnique: AssertCurrencyUnique,
  ) {}

  async execute(
    id: string,
    body: UpdateCurrencyDto,
  ): Promise<CurrencyUpdatedResponseDto> {
    await this.assertCurrencyUnique.execute(body, id);

    const currency = await this.currencyRepository.updateActiveById(id, body);

    if (!currency) {
      throw new NotFoundCustomException('errors.CURRENCY_NOT_FOUND');
    }

    return mapDocumentResponse(CurrencyUpdatedResponseDto, currency);
  }
}
