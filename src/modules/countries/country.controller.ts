import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiTags } from '../../common/swagger';
import { CountryService } from './country.service';
import { CountryCreatedResponseDto } from './dtos/country-created-response.dto';
import { CountryUpdatedResponseDto } from './dtos/country-updated-response.dto';
import { CreateCountriesDto } from './dtos/create-country.dto';
import { ListCountriesQueryDto } from './dtos/list-countries-query.dto';
import { CountryListResponseDto } from './dtos/list-response.dto';
import { UpdateCountriesDto } from './dtos/update-country.dto';
import { CreateCountrySwagger } from './swagger/create.swagger';
import { DeleteCountrySwagger } from './swagger/delete.swagger';
import { GetCountryByIdSwagger } from './swagger/get-by-id.swagger';
import { ListCountriesSwagger } from './swagger/list.swagger';
import { UpdateCountrySwagger } from './swagger/update.swagger';

@ApiTags(SwaggerApiTags.COUNTRIES)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @CreateCountrySwagger()
  createCountry(
    @Body() createCountryDto: CreateCountriesDto,
  ): Promise<CountryCreatedResponseDto> {
    return this.countryService.createCountry(createCountryDto);
  }

  @Get()
  @ListCountriesSwagger()
  listCountries(
    @Query() query: ListCountriesQueryDto,
  ): Promise<CountryListResponseDto> {
    return this.countryService.listCountries(query);
  }

  @Get(':id')
  @GetCountryByIdSwagger()
  getCountryById(
    @Param('id') id: string,
  ): Promise<CountryCreatedResponseDto> {
    return this.countryService.getCountryById(id);
  }

  @Put(':id')
  @UpdateCountrySwagger()
  updateCountry(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountriesDto,
  ): Promise<CountryUpdatedResponseDto> {
    return this.countryService.updateCountry(id, updateCountryDto);
  }

  @Delete(':id')
  @DeleteCountrySwagger()
  softDeleteCountry(@Param('id') id: string): Promise<void> {
    return this.countryService.softDeleteCountry(id);
  }
}
