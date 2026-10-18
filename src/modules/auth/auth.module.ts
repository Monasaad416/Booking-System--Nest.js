import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenSchema } from './schema/refresh-token.schema';
import { GenerateUserTokenUseCase } from './use-cases/generate-user-token-usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use.case';
import { RegisterUseCase } from './use-cases/register.usecase';
import { ModelNames } from '../../common/dataAccess';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.USERS, schema: UserSchema },
      { name: ModelNames.REFRESH_TOKENS, schema: RefreshTokenSchema },
    ]),
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>(
            'jwt.accessTokenExpiration',
          ) as JwtSignOptions['expiresIn'],
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUseCase,
    LoginUseCase,
    GenerateUserTokenUseCase,
    RefreshTokenUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
