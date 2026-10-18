import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { BadRequestCustomException } from '../../common/errorHandling/custom-exception/bad-request-custom.exception';
import { CreateUserDto } from './dtos/create.dto';
import { UserCreatedResponseDto } from './dtos/user-created-response.dto';
import { User } from './schema/user.schema';
import { ModelNames } from '../../common/dataAccess';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ModelNames.USERS) private readonly userModel: Model<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<UserCreatedResponseDto> {
    const existingByEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingByEmail) {
      throw new BadRequestCustomException('errors.EMAIL_ALREADY_EXISTS');
    }

    const existingByPhone = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (existingByPhone) {
      throw new BadRequestCustomException('errors.PHONE_NUMBER_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const { passwordConfirmation: _, ...userData } = createUserDto;

    const createdUser = await this.userModel.create({
      ...userData,
      password: hashedPassword,
    });
    //to convert created user to be instance of UserCreatedResponseDto we can
    // PlainToInstance(UserCreatedResponseDto, createdUser.toObject());

    return plainToInstance(UserCreatedResponseDto, createdUser.toObject());
  }

  async findUserByEmail(email: string): Promise<HydratedDocument<User> | null> {
    return this.userModel.findOne({ email });
  }
}
