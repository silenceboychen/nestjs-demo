import { AuthService } from './../auth/auth.service';
import { Controller, Get, Post, Body, Param, Req, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { Roles } from 'decorators/roles.decorator';
import { RolesGuard } from 'guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * 用户登录成功后，返回的 data 是授权令牌；
   * 在调用有 @UseGuards(AuthGuard()) 注解的路由时，会检查当前请求头中是否包含 Authorization: Bearer xxx 授权令牌，
   * 其中 Authorization 是用于告诉服务端本次请求有令牌，并且令牌前缀是 Bearer，而令牌的具体内容是登录之后返回的 data(accessToken)。
   */
  @Post('login')
  async login(@Body() body: User): Promise<any> {
    const data = await this.userService.login(body.username, body.password);
    const accessToken = await this.authService.createToken({ account: body.username });
    return { data, accessToken };
  }

  @Get('/auth')
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  async getUser(@Req() req): Promise<User> {
    const user = req.user;
    return user;
  }

  @Get(':id')
  async getUserInfo(@Param() id: number): Promise<User> {
      const data = await this.userService.findUserInfoWithId(id);
      return data;
  }
}
