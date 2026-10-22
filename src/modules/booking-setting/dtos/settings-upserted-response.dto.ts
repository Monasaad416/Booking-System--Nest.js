import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BookingSettingsResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 1 })
  minimumBookingNights!: number;

  @Expose()
  @ApiProperty({ example: 90 })
  maximumBookingNights!: number;

  @Expose()
  @ApiProperty({ example: 24 })
  minimumAdvanceBookingHours!: number;

  @Expose()
  @ApiProperty({ example: 365 })
  maximumAdvanceBookingDays!: number;

  @Expose()
  @ApiProperty({ example: 10 })
  maximumGuestsPerBooking!: number;
}
