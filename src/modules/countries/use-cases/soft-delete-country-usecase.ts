import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { CountryRepository } from '../country.repository';

@Injectable()
export class SoftDeleteCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<void> {
    const result = await this.countryRepository.softDeleteById(id);

    if (result.matchedCount === 0) {
      throw new NotFoundCustomException('errors.COUNTRY_NOT_FOUND');
    }
  }
}
