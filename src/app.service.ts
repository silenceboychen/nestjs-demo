import { ConfigService } from './config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(config: ConfigService) {
    console.log(config.get('NODE_ENV'));
  }
  getHello(): string {
    return 'Hello World!';
  }
}
