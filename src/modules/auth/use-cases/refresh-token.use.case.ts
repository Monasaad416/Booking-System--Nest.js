import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from '../schema/refresh-token.schema';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { UnAuthorizedCustomException } from '../../../common/errorHandling/custom-exception/un-authorized-custom.exception';
import * as bcrypt from 'bcryptjs';
import { GenerateUserTokenUseCase } from './generate-user-token-usecase';

type TokenType = 'access' | 'refresh';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async execute(body: RefreshTokenDto) {
    try {
      const decodedToken = await this.jwtService.verifyAsync<{
        userId: string;
        type: TokenType;
      }>(body.refreshToken);

      console.log('decodedToken', decodedToken);
      // must be a refresh token, not an access token
      if (!decodedToken || decodedToken.type !== 'refresh') {
        throw new UnAuthorizedCustomException('errors.INVALID_REFRESH_TOKEN');
      }
      // check if the refresh token is stored in the database
      const stored = await this.refreshTokenModel.findOne({
        userId: decodedToken.userId,
      });
      if (!stored) {
        throw new UnAuthorizedCustomException('errors.INVALID_REFRESH_TOKEN');
      }

      const matches = await bcrypt.compare(
        body.refreshToken,
        stored.refreshToken,
      );
      if (!matches) {
        throw new UnAuthorizedCustomException('errors.INVALID_REFRESH_TOKEN');
      }

      return new GenerateUserTokenUseCase(
        this.jwtService,
        this.configService,
        this.refreshTokenModel,
      ).execute(String(decodedToken.userId));
    } catch (error) {
      if (error instanceof UnAuthorizedCustomException) {
        throw error;
      }

      throw new UnAuthorizedCustomException('errors.INVALID_REFRESH_TOKEN');
    }
  }
}
