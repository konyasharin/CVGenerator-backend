import { ExceptionType } from '@common/exceptions';
import { BaseErrorAsType } from '@common/responses';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const logger = new Logger('ExceptionFilter');

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: { error: BaseErrorAsType } = {
      error: {
        message: ['Something went wrong'],
        statusCode: status,
        type: ExceptionType.BASE,
      },
    };

    if (exception instanceof Error && 'response' in exception) {
      Object.assign(errorResponse.error, exception.response);
    }

    logger.error(exception);
    response.status(status).json(errorResponse);
  }
}
