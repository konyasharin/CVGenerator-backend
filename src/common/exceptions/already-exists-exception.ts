import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionBuilder } from './exception-builder';
import { ExceptionType } from '@common/exceptions/exception-type.enum';

export class AlreadyExistsException extends HttpException {
  constructor(message: string, type?: string) {
    super(
      ExceptionBuilder.BuildResponse({
        message,
        type: type ?? ExceptionType.ALREADY_EXISTS,
        statusCode: HttpStatus.CONFLICT,
      }),
      HttpStatus.CONFLICT,
    );
  }
}
