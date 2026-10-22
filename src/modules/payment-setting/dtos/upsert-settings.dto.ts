import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpsertPaymentSettingsDto {
  @ApiPropertyOptional({ example: 15, minimum: 0, maximum: 100 })
  @Type(() => Number)
  @IsNumber({}, { message: i18nValidationMessage('validations.isNumber') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @Max(100, { message: i18nValidationMessage('validations.max') })
  @IsOptional()
  vatRate?: number;

  @ApiPropertyOptional({ example: 10, minimum: 0, maximum: 100 })
  @Type(() => Number)
  @IsNumber({}, { message: i18nValidationMessage('validations.isNumber') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @Max(100, { message: i18nValidationMessage('validations.max') })
  @IsOptional()
  guestServiceFeeRate?: number;

  @ApiPropertyOptional({ example: 3, minimum: 0, maximum: 100 })
  @Type(() => Number)
  @IsNumber({}, { message: i18nValidationMessage('validations.isNumber') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @Max(100, { message: i18nValidationMessage('validations.max') })
  @IsOptional()
  hostServiceFeeRate?: number;

  @ApiPropertyOptional({ example: 0, minimum: 0 })
  @Type(() => Number)
  @IsNumber({}, { message: i18nValidationMessage('validations.isNumber') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  minimumOrderAmount?: number;

  @ApiPropertyOptional({ example: 100000, minimum: 0 })
  @Type(() => Number)
  @IsNumber({}, { message: i18nValidationMessage('validations.isNumber') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  maximumOrderAmount?: number;
}
