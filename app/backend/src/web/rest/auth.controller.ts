import { Controller, Get, Logger, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { AdminUser as User } from '../../entities/admin-user/_base/admin-user.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('api/users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('AuthCheck')
export class AuthController {
  logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  @Get('/authorities')
  @ApiExcludeEndpoint()
  @ApiOperation({})
  @ApiResponse({})
  @Roles(RoleType.USER)
  getAuthorities(@Req() req: any): any {
    const user: User = req['user'];
    return user;
  }
}
