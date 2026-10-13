import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { LoginDto } from '../dtos/login.dto';
import { GenerateUserTokenUseCase } from './generate-user-token-usecase';
import * as bcrypt from 'bcryptjs';
import { UnAuthorizedCustomException } from '../../../common/errorHandling/custom-exception/un-authorized-custom.exception';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateUserTokenUseCase: GenerateUserTokenUseCase,
  ) {}

  async execute(
    body: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findUserByEmail(body.email);
    if (!user) {
      throw new UnAuthorizedCustomException('errors.INVALID_CREDENTIALS');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnAuthorizedCustomException('errors.INVALID_CREDENTIALS');
    }

    return await this.generateUserTokenUseCase.execute(String(user._id));
  }
}
