import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from './currency.repository';
import { CurrencyService } from './currency.service';
import { CurrencySchema } from './schema/currency.schema';
import { AssertCurrencyUnique } from './use-cases/assert-currency-unique';
import { CreateCurrencyUseCase } from './use-cases/create-currency-usecase';
import { GetCurrencyByIdUseCase } from './use-cases/get-by-id-usecase';
import { ListCurrenciesUseCase } from './use-cases/list-currencies-usecase';
import { ArchiveCurrencyUseCase } from './use-cases/archive-currency-usecase';
import { UpdateCurrencyUseCase } from './use-cases/update-currency-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.CURRENCIES,
        schema: CurrencySchema,
      },
    ]),
  ],
  controllers: [CurrencyController],
  providers: [
    CurrencyRepository,
    CurrencyService,
    CreateCurrencyUseCase,
    GetCurrencyByIdUseCase,
    ListCurrenciesUseCase,
    ArchiveCurrencyUseCase,
    UpdateCurrencyUseCase,
    AssertCurrencyUnique,
  ],
  exports: [CurrencyService, CurrencyRepository],
})
export class CurrenciesModule {}
