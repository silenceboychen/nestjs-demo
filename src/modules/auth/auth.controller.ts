import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string, password: string }): Promise<any> {
    const r = await this.authService.login(body.username, body.password);
    return { code: 200, data: r };
  }

  @Get(':id')
  async getUserInfo(@Param() id: number): Promise<any> {
      const data = await this.authService.findUserInfoWithId(id);
      return { code: 200, data };
  }
}
