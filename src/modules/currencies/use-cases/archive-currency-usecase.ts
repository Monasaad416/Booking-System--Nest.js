import { Injectable } from '@nestjs/common';
import { NotFoundCustomException } from '../../../common/errorHandling/custom-exception/not-found-custom.exception';
import { CurrencyRepository } from '../currency.repository';

@Injectable()
export class ArchiveCurrencyUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(id: string): Promise<void> {
    const result = await this.currencyRepository.softDeleteById(id);

    if (result.matchedCount === 0) {
      throw new NotFoundCustomException('errors.CURRENCY_NOT_FOUND');
    }
  }
}
