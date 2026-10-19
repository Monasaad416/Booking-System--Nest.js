import { Injectable } from '@nestjs/common';
import { CityRepository } from '../city.repository';
import { CityCreatedResponseDto } from '../dtos/city-created-response.dto';
import { AssertCityUnique } from './assert-city-unique';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CreateCityDto } from '../dtos/create-city.dto';
import { Types } from 'mongoose';

@Injectable()
export class CreateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly assertCityUnique: AssertCityUnique,
  ) {}

  async execute(body: CreateCityDto): Promise<CityCreatedResponseDto> {
    await this.assertCityUnique.execute(body);

    const createdCity = await this.cityRepository.create({
      ...body,
      countryId: new Types.ObjectId(body.countryId),
    });

    return mapDocumentResponse(CityCreatedResponseDto, createdCity);
  }
}
