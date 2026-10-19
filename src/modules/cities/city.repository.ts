import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, QueryFilter, Types } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import { ListCitiesQueryDto } from './dtos/list-cities-query.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { City } from './schema/city.schema';

export type PaginatedCities = {
  documents: HydratedDocument<City>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Injectable()
export class CityRepository extends BaseRepository<City> {
  constructor(@InjectModel(ModelNames.CITIES) cityModel: Model<City>) {
    super(cityModel);
  }

  async findPaginated(query: ListCitiesQueryDto): Promise<PaginatedCities> {
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

  existsByName(name: string, excludeId?: string) {
    return this.findOne({
      name,
      ...this.excludeId(excludeId),
    });
  }

  existsByNameInCountry(
    name: string,
    countryId: string,
    excludeId?: string,
  ): Promise<HydratedDocument<City> | null> {
    const filter: QueryFilter<City> = {
      name,
      countryId: new Types.ObjectId(countryId),
    };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    return this.findOne(filter);
  }

  findActiveById(id: string) {
    return this.findOne({ _id: id, isDeleted: { $ne: true } });
  }

  updateActiveById(id: string, body: UpdateCityDto) {
    return this.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      { $set: body },
      { new: true, runValidators: true },
    );
  }

  softDeleteById(id: string) {
    return this.updateOne(
      { _id: id, isDeleted: { $ne: true } },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
    );
  }

  private buildListFilter(query: ListCitiesQueryDto): QueryFilter<City> {
    const filter: QueryFilter<City> = {
      isDeleted: query.isDeleted === true ? true : { $ne: true },
    };

    if (query.name) {
      filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
    }

    if (query.countryId) {
      filter.countryId = new Types.ObjectId(query.countryId);
    }

    return filter;
  }

  private excludeId(excludeId?: string): QueryFilter<City> {
    return excludeId ? { _id: { $ne: excludeId } } : {};
  }
}
