import { ValidationError } from '@nestjs/common';
import { ErrorResponseInterface } from '../error-response.interface';

export function formatInputValidationErrors(
  errors: ValidationError[],
): ErrorResponseInterface[] {
  return errors.flatMap((error) => {
    const messages = Object.values(error.constraints ?? {});

    return messages.map((message): ErrorResponseInterface => ({
      field: error.property,
      message,
    }));
  });
}
