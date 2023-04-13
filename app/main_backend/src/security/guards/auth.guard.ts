import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  logger = new Logger('authGuard');

  canActivate(context: ExecutionContext): any {

    const userLogin = context.switchToHttp().getRequest();
    // console.info("canActivateRolesGuard11", userLogin);

    return super.canActivate(context);
  }
}
