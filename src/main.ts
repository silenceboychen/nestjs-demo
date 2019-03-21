import { ResultInterceptor } from './interceptors/result.interceptor';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
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
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.use(bodyParser.json({limit: '1mb'}));
  app.use(bodyParser.urlencoded({ extended: true }));
  // 全局异常拦截器
  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(), new ResultInterceptor());
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);
  await app.listen(config.get('PORT'));
}
bootstrap();
