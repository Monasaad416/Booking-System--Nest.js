import { Injectable } from '@nestjs/common';
import { CityCreatedResponseDto } from './dtos/city-created-response.dto';
import { CreateCityDto } from './dtos/create-city.dto';
import { ListCitiesQueryDto } from './dtos/list-cities-query.dto';
import { CityListResponseDto } from './dtos/list-response.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { CityUpdatedResponseDto } from './dtos/city-updated-response.dto';
import { CreateCityUseCase } from './use-cases/create-city-usecase';
import { ListCitiesUseCase } from './use-cases/list-cities-usecase';
import { GetCityByIdUseCase } from './use-cases/get-by-id-usecase';
import { UpdateCityUseCase } from './use-cases/update-city-usecase';
import { SoftDeleteCityUseCase } from './use-cases/soft-delete-city-usecase';

@Injectable()
export class CityService {
  constructor(
    private readonly createCityUseCase: CreateCityUseCase,
    private readonly listCitiesUseCase: ListCitiesUseCase,
    private readonly getCityByIdUseCase: GetCityByIdUseCase,
    private readonly updateCityUseCase: UpdateCityUseCase,
    private readonly softDeleteCityUseCase: SoftDeleteCityUseCase,
  ) {}

  createCity(body: CreateCityDto): Promise<CityCreatedResponseDto> {
    return this.createCityUseCase.execute(body);
  }

  listCities(query: ListCitiesQueryDto): Promise<CityListResponseDto> {
    return this.listCitiesUseCase.execute(query);
  }

  getCityById(id: string): Promise<CityCreatedResponseDto> {
    return this.getCityByIdUseCase.execute(id);
  }

  updateCity(id: string, body: UpdateCityDto): Promise<CityUpdatedResponseDto> {
    return this.updateCityUseCase.execute(id, body);
  }

  softDeleteCity(id: string): Promise<void> {
    return this.softDeleteCityUseCase.execute(id);
  }
}
