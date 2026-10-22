import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CancellationSettingsResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @Expose()
  @ApiProperty({ example: true })
  cancellationAllowed!: boolean;

  @Expose()
  @ApiProperty({ example: 48 })
  freeCancellationHours!: number;

  @Expose()
  @ApiProperty({ example: 0 })
  cancellationFeeRate!: number;

  @Expose()
  @ApiProperty({ example: 7 })
  refundProcessingDays!: number;
}
