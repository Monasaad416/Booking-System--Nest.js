import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CurrencyCreatedResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  id!: string;

  @Expose()
  @ApiProperty({ example: 'US Dollar' })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  name!: string;

  @Expose()
  @ApiProperty({ example: 'USD', required: false })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  code?: string;

  @Expose()
  @ApiProperty({ example: '$', required: false })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  symbol?: string;

  @Expose()
  @ApiProperty({ example: true })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  isActive!: boolean;

  @Expose()
  @ApiProperty({ example: '2026-01-01' })
  @IsDate({ message: i18nValidationMessage('validations.isDate') })
  @IsOptional()
  archivedAt?: Date | null;
}
