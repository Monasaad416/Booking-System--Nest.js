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
import { CurrencyService } from './currency.service';
import { CurrencyCreatedResponseDto } from './dtos/currency-created-response.dto';
import { CurrencyUpdatedResponseDto } from './dtos/currency-updated-response.dto';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { ListCurrenciesQueryDto } from './dtos/list-currencies-query.dto';
import { CurrencyListResponseDto } from './dtos/list-response.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { CreateCurrencySwagger } from './swagger/create.swagger';
import { ListCurrenciesSwagger } from './swagger/list.swagger';
import { GetCurrencyByIdSwagger } from './swagger/get-by-id.swagger';
import { UpdateCurrencySwagger } from './swagger/update.swagger';
import { ArchiveCurrencySwagger } from './swagger/archive.swagger';

@ApiTags(SwaggerApiTags.CURRENCIES)
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @CreateCurrencySwagger()
  createCurrency(
    @Body() createCurrencyDto: CreateCurrencyDto,
  ): Promise<CurrencyCreatedResponseDto> {
    return this.currencyService.createCurrency(createCurrencyDto);
  }

  @Get()
  @ListCurrenciesSwagger()
  listCurrencies(
    @Query() query: ListCurrenciesQueryDto,
  ): Promise<CurrencyListResponseDto> {
    return this.currencyService.listCurrencies(query);
  }

  @Get(':id')
  @GetCurrencyByIdSwagger()
  getCurrencyById(
    @Param('id') id: string,
  ): Promise<CurrencyCreatedResponseDto> {
    return this.currencyService.getCurrencyById(id);
  }

  @Put(':id')
  @UpdateCurrencySwagger()
  updateCurrency(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyUpdatedResponseDto> {
    return this.currencyService.updateCurrency(id, updateCurrencyDto);
  }

  @Delete(':id')
  @ArchiveCurrencySwagger()
  archiveCurrency(@Param('id') id: string): Promise<void> {
    return this.currencyService.archiveCurrency(id);
  }
}
