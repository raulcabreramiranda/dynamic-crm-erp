import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = this.reflector.get<string[]>('req', context.getHandler());
    const userLogin = context.switchToHttp().getRequest().user;
    console.info("canActivateRolesGuard", userLogin);
    // console.info("canActivateRolesGuard", context['args'].IncomingMessage);

    if (!roles) {
      return true;
    }

    // const request = context.switchToHttp().getRequest();

    return true;
  }
}
