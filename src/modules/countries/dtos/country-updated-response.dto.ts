import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CountryUpdatedResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  @IsOptional()
  id!: string;

  @Expose()
  @ApiProperty({ example: 'Egypt' })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  name!: string;

  @Expose()
  @ApiProperty({ example: 'EG', required: false })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  code?: string;

  @Expose()
  @ApiProperty({ example: false })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  isDeleted: boolean;

  @Expose()
  @ApiProperty({ example: '2026-01-01' })
  @IsDate({ message: i18nValidationMessage('validations.isDate') })
  @IsOptional()
  deletedAt?: Date;
}
