import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CityCreatedResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 'Cairo' })
  name!: string;

  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  countryId!: string;

  @Expose()
  @ApiProperty({ example: false })
  isDeleted!: boolean;

  @Expose()
  @ApiProperty({
    example: null,
    nullable: true,
  })
  deletedAt!: Date | null;
}
