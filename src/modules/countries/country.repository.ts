import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, QueryFilter } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import { ListCountriesQueryDto } from './dtos/list-countries-query.dto';
import { UpdateCountriesDto } from './dtos/update-country.dto';
import { Country } from './schema/country.schema';

export type PaginatedCountries = {
  documents: HydratedDocument<Country>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(@InjectModel(ModelNames.COUNTRIES) countryModel: Model<Country>) {
    super(countryModel);
  }

  async findPaginated(
    query: ListCountriesQueryDto,
  ): Promise<PaginatedCountries> {
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

  existsByCode(code: string, excludeId?: string) {
    return this.findOne({
      code,
      ...this.excludeId(excludeId),
    });
  }

  findActiveById(id: string) {
    return this.findOne({ _id: id, isDeleted: { $ne: true } });
  }

  updateActiveById(id: string, body: UpdateCountriesDto) {
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

  private buildListFilter(query: ListCountriesQueryDto): QueryFilter<Country> {
    const filter: QueryFilter<Country> = {
      isDeleted: query.isDeleted === true ? true : { $ne: true },
    };

    if (query.name) {
      filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
    }

    if (query.code) {
      filter.code = { $regex: escapeRegex(query.code), $options: 'i' };
    }

    return filter;
  }

  private excludeId(excludeId?: string): QueryFilter<Country> {
    return excludeId ? { _id: { $ne: excludeId } } : {};
  }
}
