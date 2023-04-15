import { HttpException } from '@nestjs/common';

export class StandardException extends HttpException {
  constructor(
    params: { errorCode?: number; errorMsg: string; data?: any } | string
  ) {
    const data =
      typeof params === 'string'
        ? {
            errorCode: 1,
            errorMsg: params,
            data: null,
          }
        : params;
    super(
      {
        data: data.data ?? null,
        err_code: data.errorCode ?? 1,
        err_msg: data.errorMsg,
      },
      200
    );
  }
}
