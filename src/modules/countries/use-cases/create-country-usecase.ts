import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../country.repository';
import { CountryCreatedResponseDto } from '../dtos/country-created-response.dto';
import { CreateCountriesDto } from '../dtos/create-country.dto';
import { AssertCountryUnique } from './assert-country-unique';
import { mapCountryResponse } from './map-country-response';

@Injectable()
export class CreateCountryUseCase {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly assertCountryUnique: AssertCountryUnique,
  ) {}

  async execute(body: CreateCountriesDto): Promise<CountryCreatedResponseDto> {
    await this.assertCountryUnique.execute(body);

    const createdCountry = await this.countryRepository.create(body);

    return mapCountryResponse(CountryCreatedResponseDto, createdCountry);
  }
}
