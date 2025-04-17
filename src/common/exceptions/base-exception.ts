import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionBuilder } from './exception-builder';
import { ExceptionType } from '@common/exceptions';

export class BaseException extends HttpException {
  constructor(
    message: string[] | string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(
      ExceptionBuilder.BuildResponse({
        message,
        statusCode,
        type: ExceptionType.BASE,
      }),
      statusCode,
    );
  }
}
