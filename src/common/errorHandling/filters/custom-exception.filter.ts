import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';
import { BaseCustomException } from '../custom-exception/base-custom.exception';
import { formatInputValidationErrors } from '../input-validation/format-input-validation-error';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const i18n = I18nContext.current(host);

    if (exception instanceof BaseCustomException) {
      return response.status(exception.statusCode).json({
        error: exception.formatErrorResponse().map((error) => ({
          ...error,
          message: i18n?.t(error.message) ?? error.message,
        })),
      });
    }

    if (exception instanceof I18nValidationException) {
      const inputFormatErrors = formatInputValidationErrors(exception.errors);

      return response.status(exception.getStatus()).json({
        error: inputFormatErrors,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as { message?: string | string[] }).message ??
            exception.message);

      return response.status(status).json({
        error: Array.isArray(message)
          ? message.map((item) => ({ message: item }))
          : [{ message }],
      });
    }

    this.logger.error(exception instanceof Error ? exception.stack : exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: [
        {
          message:
            i18n?.t('errors.INTERNAL_SERVER_ERROR') ?? 'Internal server error',
        },
      ],
    });
  }
}
