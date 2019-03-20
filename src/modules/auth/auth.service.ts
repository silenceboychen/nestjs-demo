import { CryptoUtil } from './../../util/crypto.util';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) {}

  async login(username: string, password: string): Promise<User> {
      const user = await this.findOneByAccount(username);
      if (!user) {
          throw new HttpException('登录账号有误', 406);
      }
      if (!this.cryptoUtil.checkPassword(password, user.password)) {
          throw new HttpException('登录密码有误', 406);
      }
      return user;
  }

  async findOneByAccount(username: string): Promise<User> {
      return await this.userRepo.findOne({ username });
  }

  async findUserInfoWithId(id: number): Promise<User> {
      return await this.userRepo.findOne(id);
  }
}
