import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AdminUser as User } from '../../entities/admin-user/_base/admin-user.entity';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { UserService } from '../../service/user.service';

@Controller('api/users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('Usuarios')
export class UserController {
  logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get('/:login')
  @ApiExcludeEndpoint()
  @Roles(RoleType.USER)
  async getUser(@Param('login') loginValue: string): Promise<User> {
    return await this.userService.find({ where: { login: loginValue } });
  }

  @Get('/id/:id')
  @ApiExcludeEndpoint()
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.find({ where: { id: +id } });
  }

  @Delete('/:login')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async deleteUser(@Req() req: Request, @Param('login') loginValue: string): Promise<User> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'User', loginValue);
    const userToDelete = await this.userService.find({
      where: { id: +loginValue },
    });
    return await this.userService.delete(userToDelete);
  }

  @Post('/save-profile-permission')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async saveProfilePermission(@Req() req: Request): Promise<any> {
    const saveProfilePermission = await this.userService.saveProfilePermission(req.body.id, req.body.name, req.body.permission);
    return saveProfilePermission;
  }

  @Post('/save-user-permission')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async saveUserPermission(@Req() req: Request): Promise<any> {
    const saveUserPermission = await this.userService.saveUserPermission(req.body.id, req.body.permission);
    return saveUserPermission;
  }
}
