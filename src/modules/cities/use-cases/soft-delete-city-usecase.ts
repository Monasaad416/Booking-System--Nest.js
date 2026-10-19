import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { CityRepository } from '../city.repository';

@Injectable()
export class SoftDeleteCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(id: string): Promise<void> {
    const result = await this.cityRepository.softDeleteById(id);

    if (result.matchedCount === 0) {
      throw new NotFoundCustomException('errors.COUNTRY_NOT_FOUND');
    }
  }
}
