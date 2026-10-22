import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpsertNotificationSettingsDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  emailNotificationsEnabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  bookingConfirmationEnabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  bookingCancellationEnabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  paymentConfirmationEnabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean({ message: i18nValidationMessage('validations.isBoolean') })
  @IsOptional()
  refundNotificationEnabled?: boolean;
}
