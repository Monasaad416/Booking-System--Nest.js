import { Injectable } from '@nestjs/common';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { ListUnitCategoriesQueryDto } from './dtos/list-unit-categories-query.dto';
import { UnitCategoryListResponseDto } from './dtos/list-response.dto';
import { UnitCategoryCreatedResponseDto } from './dtos/unit-category-created-response.dto';
import { UnitCategoryUpdatedResponseDto } from './dtos/unit-category-updated-response.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { ArchiveUnitCategoryUseCase } from './use-cases/archive-unit-category-usecase';
import { CreateUnitCategoryUseCase } from './use-cases/create-unit-category-usecase';
import { GetUnitCategoryByIdUseCase } from './use-cases/get-by-id-usecase';
import { ListUnitCategoriesUseCase } from './use-cases/list-unit-categories-usecase';
import { UpdateUnitCategoryUseCase } from './use-cases/update-unit-category-usecase';

@Injectable()
export class UnitCategoryService {
  constructor(
    private readonly createUnitCategoryUseCase: CreateUnitCategoryUseCase,
    private readonly listUnitCategoriesUseCase: ListUnitCategoriesUseCase,
    private readonly getUnitCategoryByIdUseCase: GetUnitCategoryByIdUseCase,
    private readonly updateUnitCategoryUseCase: UpdateUnitCategoryUseCase,
    private readonly archiveUnitCategoryUseCase: ArchiveUnitCategoryUseCase,
  ) {}

  createUnitCategory(
    body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryCreatedResponseDto> {
    return this.createUnitCategoryUseCase.execute(body);
  }

  listUnitCategories(
    query: ListUnitCategoriesQueryDto,
  ): Promise<UnitCategoryListResponseDto> {
    return this.listUnitCategoriesUseCase.execute(query);
  }

  getUnitCategoryById(id: string): Promise<UnitCategoryCreatedResponseDto> {
    return this.getUnitCategoryByIdUseCase.execute(id);
  }

  updateUnitCategory(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryUpdatedResponseDto> {
    return this.updateUnitCategoryUseCase.execute(id, body);
  }

  archiveUnitCategory(id: string): Promise<void> {
    return this.archiveUnitCategoryUseCase.execute(id);
  }
}
