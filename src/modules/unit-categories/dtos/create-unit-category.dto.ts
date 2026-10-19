import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUnitCategoryDto {
  @ApiProperty({
    description: 'Unit category name',
    example: 'Apartment',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  name!: string;

  @ApiPropertyOptional({
    description: 'Unit category description',
    example: 'A self-contained housing unit',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Unit category image URL',
    example: 'https://example.com/images/apartment.jpg',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  image?: string;
}
