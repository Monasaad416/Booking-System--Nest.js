import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCountriesDto {
  @ApiProperty({
    description: 'Country id',
    example: '666666666666666666666666',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  id!: string;
}
