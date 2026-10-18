import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../country.repository';
import { CountryCreatedResponseDto } from '../dtos/country-created-response.dto';
import { ListCountriesQueryDto } from '../dtos/list-countries-query.dto';
import { CountryListResponseDto } from '../dtos/list-response.dto';
import { mapCountryResponse } from './map-country-response';

@Injectable()
export class ListCountriesUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(query: ListCountriesQueryDto): Promise<CountryListResponseDto> {
    const { documents, page, limit, total, totalPages } =
      await this.countryRepository.findPaginated(query);

    return plainToInstance(
      CountryListResponseDto,
      {
        countries: documents.map((country) =>
          mapCountryResponse(CountryCreatedResponseDto, country),
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
