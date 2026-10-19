import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCityDto {
  @ApiProperty({ description: 'City name', example: 'Cairo' })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  name!: string;

  @ApiProperty({
    description: 'Country id',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  countryId!: string;
}
