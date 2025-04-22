import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionBuilder } from './exception-builder';
import { ExceptionType } from './exception-type';
import { ExceptionConstructParams } from './types';

export class BadRequestException extends HttpException {
  constructor(params: ExceptionConstructParams) {
    super(
      ExceptionBuilder.BuildResponse({
        message: params.message ?? 'Bad Request',
        type: params.type ?? ExceptionType.BAD_REQUEST,
        statusCode: HttpStatus.BAD_REQUEST,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
