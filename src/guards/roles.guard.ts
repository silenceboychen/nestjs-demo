/**
 * @author chenhao
 * @description 角色守卫, 处理当一些路由需要特定的用户角色才能访问的情况
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 通过反射获取请求路由是否添加了 @Roles() 注解，如果没有添加，则代表不需要进行认证
    // 获取@Roles里的参数
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    // 在请求对象中获取 user 对象，此 user 对象是 AuthStrategy 中 validate 方法成功执行后的返回值
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => roles.includes(user.role);
    return user && user.role && hasRole();
  }
}
