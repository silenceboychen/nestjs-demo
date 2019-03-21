import { User } from 'entities/user.entity';
import { CryptoUtil } from 'utils/crypto.util';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CryptoUtil, UserService],
})
export class UserModule {}
