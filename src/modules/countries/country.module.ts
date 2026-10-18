import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { CountryController } from './country.controller';
import { CountryRepository } from './country.repository';
import { CountryService } from './country.service';
import { CountrySchema } from './schema/country.schema';
import { AssertCountryUnique } from './use-cases/assert-country-unique';
import { CreateCountryUseCase } from './use-cases/create-country-usecase';
import { GetCountryByIdUseCase } from './use-cases/get-by-id-usecase';
import { ListCountriesUseCase } from './use-cases/list-countries-usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country-usecase';
import { UpdateCountryUseCase } from './use-cases/update-country-usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.COUNTRIES,
        schema: CountrySchema,
      },
    ]),
  ],
  controllers: [CountryController],
  providers: [
    CountryRepository,
    CountryService,
    CreateCountryUseCase,
    GetCountryByIdUseCase,
    ListCountriesUseCase,
    SoftDeleteCountryUseCase,
    UpdateCountryUseCase,
    AssertCountryUnique,
  ],
  exports: [CountryService],
})
export class CountriesModule {}
