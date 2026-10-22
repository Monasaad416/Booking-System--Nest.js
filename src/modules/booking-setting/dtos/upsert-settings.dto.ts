import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpsertBookingSettingsDto {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(1, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  minimumBookingNights?: number;

  @ApiPropertyOptional({ example: 90, minimum: 1 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(1, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  maximumBookingNights?: number;

  @ApiPropertyOptional({ example: 24, minimum: 0 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  minimumAdvanceBookingHours?: number;

  @ApiPropertyOptional({ example: 365, minimum: 1 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(1, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  maximumAdvanceBookingDays?: number;

  @ApiPropertyOptional({ example: 10, minimum: 1 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(1, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  maximumGuestsPerBooking?: number;
}
