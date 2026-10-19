import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { UnitCategorySchema } from './schema/unit-category.schema';
import { UnitCategoryController } from './unit-category.controller';
import { UnitCategoryRepository } from './unit-category.repository';
import { UnitCategoryService } from './unit-category.service';
import { ArchiveUnitCategoryUseCase } from './use-cases/archive-unit-category-usecase';
import { AssertUnitCategoryUnique } from './use-cases/assert-unit-category-unique';
import { CreateUnitCategoryUseCase } from './use-cases/create-unit-category-usecase';
import { GetUnitCategoryByIdUseCase } from './use-cases/get-by-id-usecase';
import { ListUnitCategoriesUseCase } from './use-cases/list-unit-categories-usecase';
import { UpdateUnitCategoryUseCase } from './use-cases/update-unit-category-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.UNIT_CATEGORIES,
        schema: UnitCategorySchema,
      },
    ]),
  ],
  controllers: [UnitCategoryController],
  providers: [
    UnitCategoryRepository,
    UnitCategoryService,
    CreateUnitCategoryUseCase,
    ListUnitCategoriesUseCase,
    GetUnitCategoryByIdUseCase,
    UpdateUnitCategoryUseCase,
    ArchiveUnitCategoryUseCase,
    AssertUnitCategoryUnique,
  ],
  exports: [UnitCategoryService],
})
export class UnitCategoriesModule {}
