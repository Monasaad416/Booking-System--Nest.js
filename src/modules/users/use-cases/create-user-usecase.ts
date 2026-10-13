import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.dto';
import { HydratedDocument, Model } from 'mongoose';
import { User } from '../schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { BadRequestCustomException } from '../../../common/errorHandling/custom-exception/bad-request-custom.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userModel: Model<User>) {}

  async execute(body: CreateUserDto): Promise<HydratedDocument<User>> {
    const existingByEmail = await this.userModel.findOne({
      email: body.email,
    });
    if (existingByEmail) {
      throw new BadRequestCustomException('errors.EMAIL_ALREADY_EXISTS');
    }

    const existingByPhone = await this.userModel.findOne({
      phoneNumber: body.phoneNumber,
    });
    if (existingByPhone) {
      throw new BadRequestCustomException('errors.PHONE_NUMBER_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const { passwordConfirmation: _, ...userData } = body; //_ is a dummy variable to avoid the passwordConfirmation field from being saved to the database

    return this.userModel.create({
      ...userData,
      password: hashedPassword,
    });
  }
}
