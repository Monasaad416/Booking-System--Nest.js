import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateCountriesDto {
  @ApiProperty({
    description: 'Country name',
    example: 'Egypt',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Country code',
    example: 'EG',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  code?: string;
}
