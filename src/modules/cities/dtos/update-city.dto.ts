import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateCityDto {
  @ApiProperty({
    description: 'City name',
    example: 'Cairo',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Country id',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  @IsOptional()
  countryId?: string;
}
