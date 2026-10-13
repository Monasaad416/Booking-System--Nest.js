import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshToken } from './schema/refresh-token.schema';
import { RegisterDto } from './dtos/register.dto';
import { RegisterUseCase } from './use-cases/register.usecase';
import { GenerateUserTokenUseCase } from './use-cases/generate-user-token-usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use.case';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly generateUserTokenUseCase: GenerateUserTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async register(body: RegisterDto): Promise<AuthResponseDto> {
    const authResponse = await this.registerUseCase.execute(body);
    return plainToInstance(AuthResponseDto, authResponse);
  }
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const authResponse = await this.loginUseCase.execute(loginDto);
    return plainToInstance(AuthResponseDto, authResponse);
  }

  async refreshToken(body: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(body);
  }
}
