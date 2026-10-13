import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base-custom.exception';

export class UnAuthorizedCustomException extends BaseCustomException {
  statusCode: number = HttpStatus.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
  }
}
