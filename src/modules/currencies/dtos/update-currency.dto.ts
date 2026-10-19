import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateCurrencyDto {
  @ApiProperty({
    description: 'Currency name',
    example: 'US Dollar',
    required: false,
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  name?: string;

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

  @ApiProperty({
    description: 'Currency is active',
    example: true,
    required: false,
  })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  isActive!: boolean;
}
