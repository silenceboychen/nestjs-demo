/**
 * Cors middleware.
 * @file CORS 中间件
 */

import { Injectable, NestMiddleware, MiddlewareFunction, HttpStatus, RequestMethod } from '@nestjs/common';

/**
 * @class CorsMiddleware
 * @classdesc 用于处理 CORS 跨域
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (request, response, next) => {

      const getMethod = method => RequestMethod[method];
      const origin = request.headers.origin || '';
      const allowedOrigins = [];
      const allowedMethods = [RequestMethod.GET, RequestMethod.HEAD, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.POST, RequestMethod.DELETE];
      const allowedHeaders = ['Engaged-Auth-Token', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Cache-Control', 'Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'withCredentials'];

      // Allow Origin
      // if (!origin || allowedOrigins.includes(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin || '*');
      // }

      // Headers
      response.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
      response.header('Access-Control-Allow-Methods',  allowedMethods.map(getMethod).join(','));
      response.header('Access-Control-Max-Age', '1728000');
      response.header('Content-Type', 'application/json; charset=utf-8');
      response.header('Cache-Control', 'no-cache');
      response.header('X-Powered-By', `nestjs`);

      // OPTIONS Request
      if (request.method === getMethod(RequestMethod.OPTIONS)) {
        return response.sendStatus(HttpStatus.NO_CONTENT);
      } else {
        return next();
      }
    };
  }
}
