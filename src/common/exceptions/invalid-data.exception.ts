import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionBuilder } from '@common/exceptions/exception-builder';
import { ExceptionType } from '@common/exceptions/exception-type';

export class InvalidDataException extends HttpException {
  constructor(message: string, type?: string) {
    super(
      ExceptionBuilder.BuildResponse({
        message,
        type: type ?? ExceptionType.INVALID,
        statusCode: HttpStatus.NOT_FOUND,
      }),
      HttpStatus.NOT_FOUND,
    );
  }
}
