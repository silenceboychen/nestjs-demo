import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { Roles } from 'decorators/roles.decorator';
import { RolesGuard } from 'guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('login')
  async login(@Req() req, @Body() body: User): Promise<User> {
    const data = await this.authService.login(body.username, body.password);
    req.session.user = data;
    return data;
  }

  @Get('/')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async getUser(@Req() req): Promise<User> {
    const user = req.user;
    console.log(user);
    return user;
  }

  @Get(':id')
  async getUserInfo(@Req() req, @Param() id: number): Promise<User> {
      // const data = await this.authService.findUserInfoWithId(id);
      // return data;
      console.log(req.session);
      return req.session.user;
  }
}
