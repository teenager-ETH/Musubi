import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

export interface Success<T> {
  data: T;
  err_code: 0;
  err_msg: 'success';
}

@Injectable()
export class SuccessResInterceptor<T>
  implements NestInterceptor<T, Success<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Success<T>> {
    const httpCtx = ctx.switchToHttp();
    const req = httpCtx.getRequest<Request>();
    const traceId = req.body?.trace_id;
    return next.handle().pipe(
      map((data) => ({
        data: data ?? {},
        err_code: 0,
        err_msg: 'success',
        trace_id: traceId,
      }))
    );
  }
}
