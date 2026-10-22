import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationSettingsResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @Expose()
  @ApiProperty({ example: true })
  emailNotificationsEnabled!: boolean;

  @Expose()
  @ApiProperty({ example: true })
  bookingConfirmationEnabled!: boolean;

  @Expose()
  @ApiProperty({ example: true })
  bookingCancellationEnabled!: boolean;

  @Expose()
  @ApiProperty({ example: true })
  paymentConfirmationEnabled!: boolean;

  @Expose()
  @ApiProperty({ example: true })
  refundNotificationEnabled!: boolean;
}
