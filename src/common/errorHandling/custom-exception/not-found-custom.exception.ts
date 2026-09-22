import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base-custom.exception';

export class NotFoundCustomException extends BaseCustomException {
  statusCode: number = HttpStatus.NOT_FOUND;
  protected constructor(message: string) {
    super(message);
  }
}
