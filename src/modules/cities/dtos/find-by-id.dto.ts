import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class FindCityByIdDto {
  @ApiProperty({
    description: 'City id',
    example: '666666666666666666666666',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  id!: string;
}
