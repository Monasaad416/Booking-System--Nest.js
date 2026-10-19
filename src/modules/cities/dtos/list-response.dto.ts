import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CityCreatedResponseDto } from './city-created-response.dto';

export class CityListResponseDto {
  @Expose()
  @ApiProperty({ type: [CityCreatedResponseDto] })
  @IsArray({ message: i18nValidationMessage('validations.isArray') })
  cities!: CityCreatedResponseDto[];

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
