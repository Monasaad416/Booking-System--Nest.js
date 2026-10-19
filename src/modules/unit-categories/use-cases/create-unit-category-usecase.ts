import { Injectable } from '@nestjs/common';
import { mapDocumentResponse } from '../../../common/mapping/map-document-response';
import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { UnitCategoryCreatedResponseDto } from '../dtos/unit-category-created-response.dto';
import { UnitCategoryRepository } from '../unit-category.repository';
import { AssertUnitCategoryUnique } from './assert-unit-category-unique';

@Injectable()
export class CreateUnitCategoryUseCase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
    private readonly assertUnitCategoryUnique: AssertUnitCategoryUnique,
  ) {}

  async execute(
    body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryCreatedResponseDto> {
    await this.assertUnitCategoryUnique.execute(body);

    const created = await this.unitCategoryRepository.create(body);

    return mapDocumentResponse(UnitCategoryCreatedResponseDto, created);
  }
}
