import { User } from 'entities/user.entity';
import { CryptoUtil } from 'utils/crypto.util';
import { UserService } from './user.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [CryptoUtil, UserService],
  exports: [UserService],
})
export class UserModule {}
