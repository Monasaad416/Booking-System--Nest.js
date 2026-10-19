import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTags } from '../../common/swagger';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { ListUnitCategoriesQueryDto } from './dtos/list-unit-categories-query.dto';
import { UnitCategoryListResponseDto } from './dtos/list-response.dto';
import { UnitCategoryCreatedResponseDto } from './dtos/unit-category-created-response.dto';
import { UnitCategoryUpdatedResponseDto } from './dtos/unit-category-updated-response.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { ArchiveUnitCategorySwagger } from './swagger/archive.swagger';
import { CreateUnitCategorySwagger } from './swagger/create.swagger';
import { GetUnitCategoryByIdSwagger } from './swagger/get-by-id.swagger';
import { ListUnitCategoriesSwagger } from './swagger/list.swagger';
import { UpdateUnitCategorySwagger } from './swagger/update.swagger';
import { UnitCategoryService } from './unit-category.service';

@ApiTags(SwaggerApiTags.UNIT_CATEGORIES)
@Controller('unit-category')
export class UnitCategoryController {
  constructor(private readonly unitCategoryService: UnitCategoryService) {}

  @Post()
  @CreateUnitCategorySwagger()
  createUnitCategory(
    @Body() body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryCreatedResponseDto> {
    return this.unitCategoryService.createUnitCategory(body);
  }

  @Get()
  @ListUnitCategoriesSwagger()
  listUnitCategories(
    @Query() query: ListUnitCategoriesQueryDto,
  ): Promise<UnitCategoryListResponseDto> {
    return this.unitCategoryService.listUnitCategories(query);
  }

  @Get(':id')
  @GetUnitCategoryByIdSwagger()
  getUnitCategoryById(
    @Param('id') id: string,
  ): Promise<UnitCategoryCreatedResponseDto> {
    return this.unitCategoryService.getUnitCategoryById(id);
  }

  @Put(':id')
  @UpdateUnitCategorySwagger()
  updateUnitCategory(
    @Param('id') id: string,
    @Body() body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryUpdatedResponseDto> {
    return this.unitCategoryService.updateUnitCategory(id, body);
  }

  @Delete(':id')
  @ArchiveUnitCategorySwagger()
  archiveUnitCategory(@Param('id') id: string): Promise<void> {
    return this.unitCategoryService.archiveUnitCategory(id);
  }
}
