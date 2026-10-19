import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { CountryRepository } from '../country.repository';
import { CountryUpdatedResponseDto } from '../dtos/country-updated-response.dto';
import { UpdateCountriesDto } from '../dtos/update-country.dto';
import { AssertCountryUnique } from './assert-country-unique';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';

@Injectable()
export class UpdateCountryUseCase {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly assertCountryUnique: AssertCountryUnique,
  ) {}

  async execute(
    id: string,
    body: UpdateCountriesDto,
  ): Promise<CountryUpdatedResponseDto> {
    await this.assertCountryUnique.execute(body, id);

    const country = await this.countryRepository.updateActiveById(id, body);

    if (!country) {
      throw new NotFoundCustomException('errors.COUNTRY_NOT_FOUND');
    }

    return mapDocumentResponse(CountryUpdatedResponseDto, country);
  }
}
