import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string,
    code: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(
      {
        message: [message],
        error: 'BASE_EXCEPTION',
        statusCode: code,
      },
      code,
    );
  }
}
