import { BaseErrorAsType } from '@common/responses';
import { HttpStatus } from '@nestjs/common';

import { ExceptionType } from './exception-type';

type BuildErrorParam = Omit<BaseErrorAsType, 'message'> & {
  message: string | string[];
};

export class ExceptionBuilder {
  public static BuildResponse(error: BuildErrorParam) {
    const response: BaseErrorAsType = {
      message: Array.isArray(error.message) ? error.message : [error.message],
      type: error.type ?? ExceptionType.BASE,
      statusCode: error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    };

    return response;
  }
}
