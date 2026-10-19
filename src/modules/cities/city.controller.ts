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
import { CityService } from './city.service';
import { CityCreatedResponseDto } from './dtos/city-created-response.dto';
import { CityUpdatedResponseDto } from './dtos/city-updated-response.dto';
import { CreateCityDto } from './dtos/create-city.dto';
import { ListCitiesQueryDto } from './dtos/list-cities-query.dto';
import { CityListResponseDto } from './dtos/list-response.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { CreateCitySwagger } from './swagger/create.swagger';
import { GetCityByIdSwagger } from './swagger/get-by-id.swagger';
import { ListCitiesSwagger } from './swagger/list.swagger';
import { UpdateCitySwagger } from './swagger/update.swagger';
import { DeleteCitySwagger } from './swagger/delete.swagger';

@ApiTags(SwaggerApiTags.CITIES)
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @CreateCitySwagger()
  createCity(
    @Body() createCityDto: CreateCityDto,
  ): Promise<CityCreatedResponseDto> {
    return this.cityService.createCity(createCityDto);
  }

  @Get()
  @ListCitiesSwagger()
  listCountries(
    @Query() query: ListCitiesQueryDto,
  ): Promise<CityListResponseDto> {
    return this.cityService.listCities(query);
  }

  @Get(':id')
  @GetCityByIdSwagger()
  getCityById(@Param('id') id: string): Promise<CityCreatedResponseDto> {
    return this.cityService.getCityById(id);
  }

  @Put(':id')
  @UpdateCitySwagger()
  updateCity(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<CityUpdatedResponseDto> {
    return this.cityService.updateCity(id, updateCityDto);
  }

  @Delete(':id')
  @DeleteCitySwagger()
  softDeleteCity(@Param('id') id: string): Promise<void> {
    return this.cityService.softDeleteCity(id);
  }
}
