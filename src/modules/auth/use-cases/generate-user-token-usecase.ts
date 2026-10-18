import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schema/refresh-token.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ModelNames } from '../../../common/dataAccess';
type TokenType = 'access' | 'refresh';

@Injectable()
export class GenerateUserTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(ModelNames.REFRESH_TOKENS)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}
  async execute(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenExpiration = this.configService.getOrThrow<string>(
      'jwt.accessTokenExpiration',
    ) as JwtSignOptions['expiresIn'];
    const refreshTokenExpiration = this.configService.getOrThrow<string>(
      'jwt.refreshTokenExpiration',
    ) as JwtSignOptions['expiresIn'];

    // always create BOTH tokens; type goes in the payload
    const accessToken = await this.jwtService.signAsync(
      { userId, type: 'access' satisfies TokenType },
      { expiresIn: accessTokenExpiration },
    );
    const refreshToken = await this.jwtService.signAsync(
      { userId, type: 'refresh' satisfies TokenType },
      { expiresIn: refreshTokenExpiration },
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      {
        refreshToken: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      { returnDocument: 'after', upsert: true },
    );

    return { accessToken, refreshToken };
  }
}
