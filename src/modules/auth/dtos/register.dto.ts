import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends LoginDto {
  @ApiProperty({
    description: 'name',
    example: 'John Doe',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  name!: string;

  @ApiProperty({
    description: 'phoneNumber',
    example: '01234567890',
  })
  @IsPhoneNumber('EG', {
    message: i18nValidationMessage('validations.isPhoneNumber'),
  })
  phoneNumber!: string;

  @ApiProperty({
    description: 'passwordConfirmation',
    example: '123456',
  })
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  passwordConfirmation!: string;
}
