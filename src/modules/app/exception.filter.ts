import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { BASE_ERROR_VALUE } from '@common/responses';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      message: ['Something went wrong'],
      statusCode: status,
      error: BASE_ERROR_VALUE,
    };

    if (exception instanceof Error && 'response' in exception) {
      Object.assign(errorResponse, exception.response);
    }

    response.status(status).json(errorResponse);
  }
}
