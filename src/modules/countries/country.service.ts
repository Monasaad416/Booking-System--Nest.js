import { Injectable } from '@nestjs/common';
import { CountryCreatedResponseDto } from './dtos/country-created-response.dto';
import { CountryUpdatedResponseDto } from './dtos/country-updated-response.dto';
import { CreateCountriesDto } from './dtos/create-country.dto';
import { ListCountriesQueryDto } from './dtos/list-countries-query.dto';
import { CountryListResponseDto } from './dtos/list-response.dto';
import { UpdateCountriesDto } from './dtos/update-country.dto';
import { CreateCountryUseCase } from './use-cases/create-country-usecase';
import { GetCountryByIdUseCase } from './use-cases/get-by-id-usecase';
import { ListCountriesUseCase } from './use-cases/list-countries-usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country-usecase';
import { UpdateCountryUseCase } from './use-cases/update-country-usecase';

@Injectable()
export class CountryService {
  constructor(
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly listCountriesUseCase: ListCountriesUseCase,
    private readonly getCountryByIdUseCase: GetCountryByIdUseCase,
    private readonly updateCountryUseCase: UpdateCountryUseCase,
    private readonly softDeleteCountryUseCase: SoftDeleteCountryUseCase,
  ) {}

  createCountry(body: CreateCountriesDto): Promise<CountryCreatedResponseDto> {
    return this.createCountryUseCase.execute(body);
  }

  listCountries(query: ListCountriesQueryDto): Promise<CountryListResponseDto> {
    return this.listCountriesUseCase.execute(query);
  }

  getCountryById(id: string): Promise<CountryCreatedResponseDto> {
    return this.getCountryByIdUseCase.execute(id);
  }

  updateCountry(
    id: string,
    body: UpdateCountriesDto,
  ): Promise<CountryUpdatedResponseDto> {
    return this.updateCountryUseCase.execute(id, body);
  }

  softDeleteCountry(id: string): Promise<void> {
    return this.softDeleteCountryUseCase.execute(id);
  }
}
