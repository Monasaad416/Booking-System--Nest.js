import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CityRepository } from '../city.repository';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { CityUpdatedResponseDto } from '../dtos/city-updated-response.dto';
import { AssertCityUnique } from './assert-city-unique';

@Injectable()
export class UpdateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly assertCityUnique: AssertCityUnique,
  ) {}

  async execute(
    id: string,
    body: UpdateCityDto,
  ): Promise<CityUpdatedResponseDto> {
    await this.assertCityUnique.execute(body, id);

    const city = await this.cityRepository.updateActiveById(id, body);

    if (!city) {
      throw new NotFoundCustomException('errors.CITY_NOT_FOUND');
    }

    return mapDocumentResponse(CityUpdatedResponseDto, city);
  }
}
