import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UnitCategoryUpdatedResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 'Apartment' })
  name!: string;

  @Expose()
  @ApiPropertyOptional({ example: 'A self-contained housing unit' })
  description?: string;

  @Expose()
  @ApiPropertyOptional({ example: 'https://example.com/images/apartment.jpg' })
  image?: string;

  @Expose()
  @ApiProperty({ example: true })
  isActive!: boolean;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  archivedAt!: Date | null;
}
