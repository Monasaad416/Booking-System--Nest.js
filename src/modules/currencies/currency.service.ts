import { Injectable } from '@nestjs/common';
import { CurrencyCreatedResponseDto } from './dtos/currency-created-response.dto';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { ListCurrenciesQueryDto } from './dtos/list-currencies-query.dto';
import { CurrencyListResponseDto } from './dtos/list-response.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { GetCurrencyByIdUseCase } from './use-cases/get-by-id-usecase';
import { ArchiveCurrencyUseCase } from './use-cases/archive-currency-usecase';
import { CreateCurrencyUseCase } from './use-cases/create-currency-usecase';
import { CurrencyUpdatedResponseDto } from './dtos/currency-updated-response.dto';
import { UpdateCurrencyUseCase } from './use-cases/update-currency-usecase';
import { ListCurrenciesUseCase } from './use-cases/list-currencies-usecase';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly createCurrencyUseCase: CreateCurrencyUseCase,
    private readonly listCurrenciesUseCase: ListCurrenciesUseCase,
    private readonly getCurrencyByIdUseCase: GetCurrencyByIdUseCase,
    private readonly updateCurrencyUseCase: UpdateCurrencyUseCase,
    private readonly archiveCurrencyUseCase: ArchiveCurrencyUseCase,
  ) {}

  createCurrency(body: CreateCurrencyDto): Promise<CurrencyCreatedResponseDto> {
    return this.createCurrencyUseCase.execute(body);
  }

  listCurrencies(
    query: ListCurrenciesQueryDto,
  ): Promise<CurrencyListResponseDto> {
    return this.listCurrenciesUseCase.execute(query);
  }

  getCurrencyById(id: string): Promise<CurrencyCreatedResponseDto> {
    return this.getCurrencyByIdUseCase.execute(id);
  }

  updateCurrency(
    id: string,
    body: UpdateCurrencyDto,
  ): Promise<CurrencyUpdatedResponseDto> {
    return this.updateCurrencyUseCase.execute(id, body);
  }

  archiveCurrency(id: string): Promise<void> {
    return this.archiveCurrencyUseCase.execute(id);
  }
}
