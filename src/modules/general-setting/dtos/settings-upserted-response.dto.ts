import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SettingsUpsertedResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 'Livora' })
  appName!: string;

  @Expose()
  @ApiProperty({ example: 'USD' })
  defaultCurrency!: string;

  @Expose()
  @ApiProperty({ example: 'en' })
  defaultLanguage!: string;

  @Expose()
  @ApiProperty({ example: ['en', 'ar'], type: [String] })
  supportedLanguages!: string[];

  @Expose()
  @ApiProperty({ example: 'UTC' })
  timezone!: string;

  @Expose()
  @ApiProperty({ example: false })
  maintenanceMode!: boolean;
}
