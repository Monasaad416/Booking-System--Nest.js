import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { UnitCategoryRepository } from '../unit-category.repository';

@Injectable()
export class ArchiveUnitCategoryUseCase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.unitCategoryRepository.findById(id);

    if (!category) {
      throw new NotFoundCustomException('errors.UNIT_CATEGORY_NOT_FOUND');
    }

    if (category.isActive === false) {
      throw new BadRequestCustomException(
        'errors.UNIT_CATEGORY_ALREADY_ARCHIVED',
      );
    }

    await this.unitCategoryRepository.archiveById(id);
  }
}
