import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { CurrencyRepository } from '../currency.repository';

@Injectable()
export class AssertCurrencyUnique {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    body: { name?: string; code?: string },
    excludeId?: string,
  ): Promise<void> {
    if (body.name) {
      const existingByName = await this.currencyRepository.existsByName(
        body.name,
        excludeId,
      );
      if (existingByName) {
        throw new BadRequestCustomException(
          'errors.CURRENCY_NAME_ALREADY_EXISTS',
        );
      }
    }

    if (body.code) {
      const existingByCode = await this.currencyRepository.existsByCode(
        body.code,
        excludeId,
      );
      if (existingByCode) {
        throw new BadRequestCustomException(
          'errors.CURRENCY_CODE_ALREADY_EXISTS',
        );
      }
    }
  }
}
