import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { CreateUserDto } from '../../users/dtos/create.dto';
import { GenerateUserTokenUseCase } from './generate-user-token-usecase';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from '../schema/refresh-token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async execute(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const createUserDto: CreateUserDto = { ...registerDto };
    const user = await this.usersService.createUser(createUserDto);

    return new GenerateUserTokenUseCase(
      this.jwtService,
      this.configService,
      this.refreshTokenModel,
    ).execute(user.id);
  }
}
