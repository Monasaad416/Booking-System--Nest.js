import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @ApiProperty({
    description: 'email',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: i18nValidationMessage('validations.isEmail') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  email!: string;

  @ApiProperty({
    description: 'password',
    example: '123456',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  password!: string;
}
