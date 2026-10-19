import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, QueryFilter } from 'mongoose';
import { ModelNames } from '../../common/dataAccess';
import { BaseRepository } from '../../common/dataAccess/base-repository';
import { ListCurrenciesQueryDto } from './dtos/list-currencies-query.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { Currency } from './schema/currency.schema';

export type PaginatedCurrencies = {
  documents: HydratedDocument<Currency>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Injectable()
export class CurrencyRepository extends BaseRepository<Currency> {
  constructor(
    @InjectModel(ModelNames.CURRENCIES) currencyModel: Model<Currency>,
  ) {
    super(currencyModel);
  }

  async findPaginated(
    query: ListCurrenciesQueryDto,
  ): Promise<PaginatedCurrencies> {
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

  updateActiveById(id: string, body: UpdateCurrencyDto) {
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
          isActive: false,
          archivedAt: new Date(),
        },
      },
    );
  }

  private buildListFilter(
    query: ListCurrenciesQueryDto,
  ): QueryFilter<Currency> {
    const filter: QueryFilter<Currency> = {
      isActive: query.isActive === true ? true : { $ne: false },
    };

    if (query.name) {
      filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
    }

    if (query.code) {
      filter.code = { $regex: escapeRegex(query.code), $options: 'i' };
    }

    return filter;
  }

  private excludeId(excludeId?: string): QueryFilter<Currency> {
    return excludeId ? { _id: { $ne: excludeId } } : {};
  }
}
