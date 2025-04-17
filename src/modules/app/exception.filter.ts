import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';
import { BaseErrorAsType } from '@common/responses';
import { ExceptionType } from '@common/exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const logger = new Logger('ExceptionFilter');

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: BaseErrorAsType = {
      message: ['Something went wrong'],
      statusCode: status,
      type: ExceptionType.BASE,
    };

    if (exception instanceof Error && 'response' in exception) {
      Object.assign(errorResponse, exception.response);
    }

    logger.error(exception);
    response.status(status).json(errorResponse);
  }
}
