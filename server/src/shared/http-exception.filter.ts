import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { StandardException } from './standard.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof StandardException) {
      const res = exception.getResponse();
      return response.status(200).json(res);
    }
    // TODO: 日志
    console.error(exception);
    return response.status(200).json({
      data: null,
      err_code: 1,
      err_msg: 'Internal server error',
    });
  }
}
