import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { CountryRepository } from '../country.repository';
import { CountryCreatedResponseDto } from '../dtos/country-created-response.dto';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';

@Injectable()
export class GetCountryByIdUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<CountryCreatedResponseDto> {
    const country = await this.countryRepository.findActiveById(id);

    if (!country) {
      throw new NotFoundCustomException('errors.COUNTRY_NOT_FOUND');
    }

    return mapDocumentResponse(CountryCreatedResponseDto, country);
  }
}
