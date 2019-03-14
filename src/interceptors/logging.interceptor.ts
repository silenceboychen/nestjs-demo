/**
 * Logging interceptor.
 * @file 日志拦截器
 */

import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    console.log('+ 收到请求：', content);
    const now = Date.now();
    return call$.pipe(
      tap(() => console.log(`After...  ${content} ${Date.now() - now}ms`)),
    );
  }
}
