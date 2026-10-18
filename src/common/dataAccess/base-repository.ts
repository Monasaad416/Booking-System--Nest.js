import {
  HydratedDocument,
  Model,
  QueryFilter,
  SortOrder,
  UpdateQuery,
} from 'mongoose';

export type ListOptions = {
  sort?: Record<string, SortOrder>;
  skip?: number;
  limit?: number;
};

export type PaginationOptions = {
  page: number;
  limit: number;
  sort?: Record<string, SortOrder>;
};

export abstract class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  create(data: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(data);
  }

  findOne(filter: QueryFilter<T>): Promise<HydratedDocument<T> | null> {
    return this.model.findOne(filter);
  }

  findById(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id);
  }

  find(
    filter: QueryFilter<T> = {},
    options?: ListOptions,
  ): Promise<HydratedDocument<T>[]> {
    let query = this.model.find(filter);

    if (options?.sort) {
      query = query.sort(options.sort);
    }
    if (options?.skip !== undefined) {
      query = query.skip(options.skip);
    }
    if (options?.limit !== undefined) {
      query = query.limit(options.limit);
    }

    return query.exec();
  }

  count(filter: QueryFilter<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async paginate(
    filter: QueryFilter<T>,
    options: PaginationOptions,
  ): Promise<{ documents: HydratedDocument<T>[]; total: number }> {
    const skip = (options.page - 1) * options.limit;
    const [documents, total] = await Promise.all([
      this.find(filter, {
        sort: options.sort,
        skip,
        limit: options.limit,
      }),
      this.count(filter),
    ]);

    return { documents, total };
  }

  findOneAndUpdate(
    filter: QueryFilter<T>,
    update: UpdateQuery<T>,
    options?: { new?: boolean; runValidators?: boolean },
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>) {
    return this.model.updateOne(filter, update);
  }
}
