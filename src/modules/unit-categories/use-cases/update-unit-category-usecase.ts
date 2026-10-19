import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { UnitCategoryUpdatedResponseDto } from '../dtos/unit-category-updated-response.dto';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import { UnitCategoryRepository } from '../unit-category.repository';
import { AssertUnitCategoryUnique } from './assert-unit-category-unique';

@Injectable()
export class UpdateUnitCategoryUseCase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
    private readonly assertUnitCategoryUnique: AssertUnitCategoryUnique,
  ) {}

  async execute(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryUpdatedResponseDto> {
    await this.assertUnitCategoryUnique.execute(body, id);

    const category = await this.unitCategoryRepository.updateActiveById(
      id,
      body,
    );

    if (!category) {
      throw new NotFoundCustomException('errors.UNIT_CATEGORY_NOT_FOUND');
    }

    return mapDocumentResponse(UnitCategoryUpdatedResponseDto, category);
  }
}
