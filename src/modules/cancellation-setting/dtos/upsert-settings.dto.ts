import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpsertCancellationSettingsDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  cancellationAllowed?: boolean;

  @ApiPropertyOptional({ example: 48, minimum: 0 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  freeCancellationHours?: number;

  @ApiPropertyOptional({ example: 0, minimum: 0, maximum: 100 })
  @Type(() => Number)
  @IsNumber({}, { message: i18nValidationMessage('validations.isNumber') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @Max(100, { message: i18nValidationMessage('validations.max') })
  @IsOptional()
  cancellationFeeRate?: number;

  @ApiPropertyOptional({ example: 7, minimum: 0 })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.isInt') })
  @Min(0, { message: i18nValidationMessage('validations.min') })
  @IsOptional()
  refundProcessingDays?: number;
}
