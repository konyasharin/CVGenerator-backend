import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionBuilder } from './exception-builder';
import { ExceptionType } from './exception-type';
import { ExceptionConstructParams } from './types';

export class AlreadyExistsException extends HttpException {
  constructor(params: ExceptionConstructParams) {
    super(
      ExceptionBuilder.BuildResponse({
        message: params.message ?? 'Already Exists',
        type: params.type ?? ExceptionType.ALREADY_EXISTS,
        statusCode: HttpStatus.CONFLICT,
      }),
      HttpStatus.CONFLICT,
    );
  }
}
