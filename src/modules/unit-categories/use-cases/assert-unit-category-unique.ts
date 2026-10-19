import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { UnitCategoryRepository } from '../unit-category.repository';

@Injectable()
export class AssertUnitCategoryUnique {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}

  async execute(
    body: { name?: string },
    excludeId?: string,
  ): Promise<void> {
    if (!body.name) {
      return;
    }

    const existing = await this.unitCategoryRepository.existsByName(
      body.name,
      excludeId,
    );
    if (existing) {
      throw new BadRequestCustomException(
        'errors.UNIT_CATEGORY_NAME_ALREADY_EXISTS',
      );
    }
  }
}
