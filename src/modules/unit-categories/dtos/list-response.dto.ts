import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UnitCategoryCreatedResponseDto } from './unit-category-created-response.dto';

export class UnitCategoryListResponseDto {
  @Expose()
  @ApiProperty({ type: [UnitCategoryCreatedResponseDto] })
  unitCategories!: UnitCategoryCreatedResponseDto[];

  @Expose()
  @ApiProperty({ example: 1 })
  page!: number;

  @Expose()
  @ApiProperty({ example: 10 })
  limit!: number;

  @Expose()
  @ApiProperty({ example: 25 })
  total!: number;

  @Expose()
  @ApiProperty({ example: 3 })
  totalPages!: number;
}
