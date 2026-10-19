import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { ListUnitCategoriesQueryDto } from '../dtos/list-unit-categories-query.dto';
import { UnitCategoryListResponseDto } from '../dtos/list-response.dto';
import { UnitCategoryCreatedResponseDto } from '../dtos/unit-category-created-response.dto';
import { UnitCategoryRepository } from '../unit-category.repository';

@Injectable()
export class ListUnitCategoriesUseCase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}

  async execute(
    query: ListUnitCategoriesQueryDto,
  ): Promise<UnitCategoryListResponseDto> {
    const { documents, page, limit, total, totalPages } =
      await this.unitCategoryRepository.findPaginated(query);

    return plainToInstance(
      UnitCategoryListResponseDto,
      {
        unitCategories: documents.map((category) =>
          mapDocumentResponse(UnitCategoryCreatedResponseDto, category),
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
