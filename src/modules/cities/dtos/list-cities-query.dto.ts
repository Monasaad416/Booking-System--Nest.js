import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ListCitiesQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(1, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(1, { message: i18nValidationMessage('validations.min') })
  @Max(100, { message: i18nValidationMessage('validations.max') })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Country id' })
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  @IsOptional()
  countryId?: string;

  @ApiPropertyOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  isDeleted?: boolean;
}
