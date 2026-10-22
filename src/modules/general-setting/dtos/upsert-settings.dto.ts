import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

function normalizeLanguages(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return (value as unknown[]).map((language) =>
    typeof language === 'string' ? language.trim().toLowerCase() : language,
  );
}

export class UpsertSettingsDto {
  @ApiPropertyOptional({
    description: 'Application name',
    example: 'Livora',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  appName?: string;

  @ApiPropertyOptional({
    description: 'Default currency code',
    example: 'USD',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  defaultCurrency?: string;

  @ApiPropertyOptional({
    description: 'Default language code',
    example: 'en',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  defaultLanguage?: string;

  @ApiPropertyOptional({
    description: 'Supported language codes',
    example: ['en', 'ar'],
    type: [String],
  })
  @Transform(({ value }: { value: unknown }) => normalizeLanguages(value))
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validations.isArray') })
  @ArrayMinSize(1, { message: i18nValidationMessage('validations.min') })
  @ArrayUnique()
  @IsString({
    each: true,
    message: i18nValidationMessage('validations.isString'),
  })
  @IsNotEmpty({ each: true })
  supportedLanguages?: string[];

  @ApiPropertyOptional({
    description: 'Timezone',
    example: 'UTC',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional({
    description: 'Whether the application is in maintenance mode',
    example: false,
  })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  maintenanceMode?: boolean;
}
