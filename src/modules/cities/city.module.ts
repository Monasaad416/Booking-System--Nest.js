import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../../common/dataAccess';
import { CityRepository } from './city.repository';
import { CitySchema } from './schema/city.schema';
import { AssertCityUnique } from './use-cases/assert-city-unique';
import { CreateCityUseCase } from './use-cases/create-city-usecase';
import { GetCityByIdUseCase } from './use-cases/get-by-id-usecase';
import { ListCitiesUseCase } from './use-cases/list-cities-usecase';
import { SoftDeleteCityUseCase } from './use-cases/soft-delete-city-usecase';
import { UpdateCityUseCase } from './use-cases/update-city-usecase';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.CITIES,
        schema: CitySchema,
      },
    ]),
  ],
  controllers: [CityController],
  providers: [
    CityRepository,
    CityService,
    CreateCityUseCase,
    GetCityByIdUseCase,
    ListCitiesUseCase,
    SoftDeleteCityUseCase,
    UpdateCityUseCase,
    AssertCityUnique,
  ],
  exports: [CityService],
})
export class CitiesModule {}
