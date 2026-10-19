import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { UnitCategoryCreatedResponseDto } from '../dtos/unit-category-created-response.dto';
import { UnitCategoryRepository } from '../unit-category.repository';

@Injectable()
export class GetUnitCategoryByIdUseCase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}

  async execute(id: string): Promise<UnitCategoryCreatedResponseDto> {
    const category = await this.unitCategoryRepository.findActiveById(id);

    if (!category) {
      throw new NotFoundCustomException('errors.UNIT_CATEGORY_NOT_FOUND');
    }

    return mapDocumentResponse(UnitCategoryCreatedResponseDto, category);
  }
}
