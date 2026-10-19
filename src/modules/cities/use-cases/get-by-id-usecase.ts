import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { CityRepository } from '../city.repository';
import { CityCreatedResponseDto } from '../dtos/city-created-response.dto';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';

@Injectable()
export class GetCityByIdUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(id: string): Promise<CityCreatedResponseDto> {
    const city = await this.cityRepository.findActiveById(id);

    if (!city) {
      throw new NotFoundCustomException('errors.CITY_NOT_FOUND');
    }

    return mapDocumentResponse(CityCreatedResponseDto, city);
  }
}
