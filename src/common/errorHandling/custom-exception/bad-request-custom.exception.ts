import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base-custom.exception';

export class BadRequestCustomException extends BaseCustomException {
  statusCode: number = HttpStatus.BAD_REQUEST;
  protected constructor(message: string) {
    super(message);
  }
}
