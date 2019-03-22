import { ResultInterceptor } from './interceptors/result.interceptor';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { AnyExceptionFilter } from 'filters/error.filter';
import { ValidationPipe } from 'pipes/validation.pipe';
import { LoggingInterceptor } from 'interceptors/logging.interceptor';
import { ConfigService } from 'config/config.service';

// 替换 console 为更统一友好的
const { log, warn, info } = console;
const color = c => c;
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[nodepress]', ...args),
  info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[nodepress]', ...args),
  error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[nodepress]', ...args),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.use(bodyParser.json({limit: '1mb'}));
  app.use(bodyParser.urlencoded({ extended: true }));
  const secret = config.get('SESSION_SECRET');
  // 注册cookies中间件
  app.use(cookieParser(secret));
  // 注册session中间件
  app.use(expressSession({
    resave: false, // 即使 session 没有被修改，也保存 session 值，默认为 true。
    saveUninitialized: false,
    rolling: false, // 每个请求都重新设置一个 cookie，默认为 false。
    secret, // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    name: config.get('SESSION_NAME'), // 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
  }));

  // 全局异常拦截器
  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(), new ResultInterceptor());
  await app.listen(config.get('PORT'));
}
bootstrap();
