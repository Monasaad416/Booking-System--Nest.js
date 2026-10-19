import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { CityRepository } from '../city.repository';

@Injectable()
export class AssertCityUnique {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(
    body: { name?: string; countryId?: string },
    excludeId?: string,
  ): Promise<void> {
    let name = body.name;
    let countryId = body.countryId;

    if (excludeId && (!name || !countryId)) {
      const current = await this.cityRepository.findActiveById(excludeId);
      name = name ?? current?.name;
      countryId = countryId ?? current?.countryId.toString();
    }

    if (!name || !countryId) {
      return;
    }

    const existing = await this.cityRepository.existsByNameInCountry(
      name,
      countryId,
      excludeId,
    );
    if (existing) {
      throw new BadRequestCustomException('errors.CITY_NAME_ALREADY_EXISTS');
    }
  }
}
