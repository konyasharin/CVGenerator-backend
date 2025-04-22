import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionBuilder } from './exception-builder';
import { ExceptionType } from './exception-type';
import { ExceptionConstructParams } from './types';

export class UnauthorizedException extends HttpException {
  constructor(params: ExceptionConstructParams) {
    super(
      ExceptionBuilder.BuildResponse({
        message: params.message ?? '',
        type: params.type ?? ExceptionType.UNAUTHORIZED,
        statusCode: HttpStatus.UNAUTHORIZED,
      }),
      HttpStatus.UNAUTHORIZED,
    );
  }
}
