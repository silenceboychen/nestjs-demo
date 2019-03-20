import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from './entities/strategy.entity';
import { User } from './entities/user.entity';
import { CryptoUtil } from 'util/crypto.util';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Strategy]),
  ],
  controllers: [AuthController],
  providers: [CryptoUtil, AuthService],
})
export class AppModule {}
