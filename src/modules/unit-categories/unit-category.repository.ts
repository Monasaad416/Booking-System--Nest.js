import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, QueryFilter } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import { ListUnitCategoriesQueryDto } from './dtos/list-unit-categories-query.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { UnitCategory } from './schema/unit-category.schema';

export type PaginatedUnitCategories = {
  documents: HydratedDocument<UnitCategory>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Injectable()
export class UnitCategoryRepository extends BaseRepository<UnitCategory> {
  constructor(
    @InjectModel(ModelNames.UNIT_CATEGORIES)
    unitCategoryModel: Model<UnitCategory>,
  ) {
    super(unitCategoryModel);
  }

  async findPaginated(
    query: ListUnitCategoriesQueryDto,
  ): Promise<PaginatedUnitCategories> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const { documents, total } = await this.paginate(
      this.buildListFilter(query),
      { page, limit, sort: { name: 1 } },
    );

    return {
      documents,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 0,
    };
  }

  existsByName(
    name: string,
    excludeId?: string,
  ): Promise<HydratedDocument<UnitCategory> | null> {
    const filter: QueryFilter<UnitCategory> = { name };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    return this.findOne(filter);
  }

  findActiveById(id: string) {
    return this.findOne({ _id: id, isActive: { $ne: false } });
  }

  updateActiveById(id: string, body: UpdateUnitCategoryDto) {
    return this.findOneAndUpdate(
      { _id: id, isActive: { $ne: false } },
      { $set: body },
      { new: true, runValidators: true },
    );
  }

  archiveById(id: string) {
    return this.updateOne(
      { _id: id, isActive: { $ne: false } },
      {
        $set: {
          isActive: false,
          archivedAt: new Date(),
        },
      },
    );
  }

  private buildListFilter(
    query: ListUnitCategoriesQueryDto,
  ): QueryFilter<UnitCategory> {
    const filter: QueryFilter<UnitCategory> = {};

    if (query.isActive === true) {
      filter.isActive = true;
    } else if (query.isActive === false) {
      filter.isActive = false;
    } else {
      filter.isActive = { $ne: false };
    }

    if (query.name) {
      filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
    }

    return filter;
  }
}
