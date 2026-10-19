import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCurrencyDto {
  @ApiProperty({
    description: 'Currency name',
    example: 'US Dollar',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  name!: string;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Currency symbol',
    example: '$',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  symbol?: string;
}
