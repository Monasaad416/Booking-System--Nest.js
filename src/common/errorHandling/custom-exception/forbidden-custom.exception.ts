import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base-custom.exception';

export class ForbiddenCustomException extends BaseCustomException {
  statusCode: number = HttpStatus.FORBIDDEN;
  protected constructor(message: string) {
    super(message);
  }
}
