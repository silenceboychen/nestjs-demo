import { User } from 'entities/user.entity';
import { CryptoUtil } from 'util/crypto.util';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [CryptoUtil, AuthService],
})
export class AuthModule {}
