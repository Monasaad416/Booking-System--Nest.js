import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateUnitCategoryDto {
  @ApiPropertyOptional({
    description: 'Unit category name',
    example: 'Apartment',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  name?: string;

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

  @ApiPropertyOptional({
    description: 'Whether the unit category is active',
    example: true,
  })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  isActive?: boolean;
}
