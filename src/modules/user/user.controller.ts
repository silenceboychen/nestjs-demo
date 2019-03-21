import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('login')
  async login(@Body() body: User): Promise<any> {
    const data = await this.authService.login(body.username, body.password);
    return data;
  }

  @Get(':id')
  async getUserInfo(@Param() id: number): Promise<any> {
      const data = await this.authService.findUserInfoWithId(id);
      return data;
  }
}
