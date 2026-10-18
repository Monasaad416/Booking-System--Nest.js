import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { CountryRepository } from '../country.repository';

@Injectable()
export class AssertCountryUnique {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    body: { name?: string; code?: string },
    excludeId?: string,
  ): Promise<void> {
    if (body.name) {
      const existingByName = await this.countryRepository.existsByName(
        body.name,
        excludeId,
      );
      if (existingByName) {
        throw new BadRequestCustomException(
          'errors.COUNTRY_NAME_ALREADY_EXISTS',
        );
      }
    }

    if (body.code) {
      const existingByCode = await this.countryRepository.existsByCode(
        body.code,
        excludeId,
      );
      if (existingByCode) {
        throw new BadRequestCustomException(
          'errors.COUNTRY_CODE_ALREADY_EXISTS',
        );
      }
    }
  }
}
