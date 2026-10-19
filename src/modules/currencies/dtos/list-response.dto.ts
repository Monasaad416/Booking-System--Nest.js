import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CurrencyCreatedResponseDto } from './currency-created-response.dto';

export class CurrencyListResponseDto {
  @Expose()
  @ApiProperty({ type: [CurrencyCreatedResponseDto] })
  @IsArray({ message: i18nValidationMessage('validations.isArray') })
  currencies!: CurrencyCreatedResponseDto[];

  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  page!: number;

  @Expose()
  @ApiProperty({ example: 10 })
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  limit!: number;

  @Expose()
  @ApiProperty({ example: 25 })
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  total!: number;

  @Expose()
  @ApiProperty({ example: 3 })
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  totalPages!: number;
}
