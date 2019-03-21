/**
 * Logging interceptor.
 * @file 处理响应结果
 */

import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    // const response = context.switchToHttp().getResponse();
    // const request = context.switchToHttp().getRequest();
    return call$.pipe(
      map(data => ({ status: 200, data })),
    );
  }
}
