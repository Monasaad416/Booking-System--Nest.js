import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  name!: string;

  @IsEmail({}, { message: i18nValidationMessage('validations.isEmail') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  email!: string;

  @IsPhoneNumber('EG', {
    message: i18nValidationMessage('validations.isPhoneNumber'),
  })
  phoneNumber!: string;

  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  password!: string;

  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  passwordConfirmation!: string;
}
