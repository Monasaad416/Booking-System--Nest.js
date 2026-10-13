import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserCreatedResponseDto {
  @Expose()
  @IsMongoId({ message: i18nValidationMessage('validations.isMongoId') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  id!: string;

  @Expose()
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  name!: string;

  @Expose()
  @IsEmail({}, { message: i18nValidationMessage('validations.isEmail') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  email!: string;

  @Expose()
  @IsPhoneNumber('EG', {
    message: i18nValidationMessage('validations.isPhoneNumber'),
  })
  phoneNumber!: string;

  @Exclude()
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  password!: string;

  @Exclude()
  @IsString({ message: i18nValidationMessage('validations.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.isNotEmpty') })
  passwordConfirmation!: string;
}
