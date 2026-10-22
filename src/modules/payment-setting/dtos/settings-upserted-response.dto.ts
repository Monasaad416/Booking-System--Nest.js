import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaymentSettingsResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 15 })
  vatRate!: number;

  @Expose()
  @ApiProperty({ example: 10 })
  guestServiceFeeRate!: number;

  @Expose()
  @ApiProperty({ example: 3 })
  hostServiceFeeRate!: number;

  @Expose()
  @ApiProperty({ example: 0 })
  minimumOrderAmount!: number;

  @Expose()
  @ApiProperty({ example: 100000 })
  maximumOrderAmount!: number;
}
