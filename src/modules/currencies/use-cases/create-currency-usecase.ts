import { Injectable } from '@nestjs/common';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CurrencyRepository } from '../currency.repository';
import { CurrencyCreatedResponseDto } from '../dtos/currency-created-response.dto';
import { AssertCurrencyUnique } from './assert-currency-unique';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';

@Injectable()
export class CreateCurrencyUseCase {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly assertCurrencyUnique: AssertCurrencyUnique,
  ) {}

  async execute(body: CreateCurrencyDto): Promise<CurrencyCreatedResponseDto> {
    await this.assertCurrencyUnique.execute(body);

    const createdCurrency = await this.currencyRepository.create(body);

    return mapDocumentResponse(CurrencyCreatedResponseDto, createdCurrency);
  }
}
