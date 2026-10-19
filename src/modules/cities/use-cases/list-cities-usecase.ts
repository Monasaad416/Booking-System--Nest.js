import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CityRepository } from '../city.repository';
import { CityCreatedResponseDto } from '../dtos/city-created-response.dto';
import { ListCitiesQueryDto } from '../dtos/list-cities-query.dto';
import { CityListResponseDto } from '../dtos/list-response.dto';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';

@Injectable()
export class ListCitiesUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(query: ListCitiesQueryDto): Promise<CityListResponseDto> {
    const { documents, page, limit, total, totalPages } =
      await this.cityRepository.findPaginated(query);

    return plainToInstance(
      CityListResponseDto,
      {
        cities: documents.map((city) =>
          mapDocumentResponse(CityCreatedResponseDto, city),
        ),
        page,
        limit,
        total,
        totalPages,
      },
      { excludeExtraneousValues: true },
    );
  }
}
