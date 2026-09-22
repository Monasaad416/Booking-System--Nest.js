import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { BaseCustomException } from '../custom-exception/base-custom.exception';
import { I18nValidationException } from 'nestjs-i18n';
import { formatInputValidationErrors } from '../input-validation/format-input-validation-error';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BaseCustomException) {
      return response.status(exception.statusCode).json({
        error: exception.formatErrorResponse(),
      });
    }

    if (exception instanceof I18nValidationException) {
      const inputFormatErrors = formatInputValidationErrors(exception.errors);

      return response.status(400).json({
        error: inputFormatErrors,
      });
    }

    return response.status(500).json({
      error: [{ message: 'Internal server error' }],
    });
  }
}
