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

  constructor(private readonly userService: UserService, protected readonly userRepository: UserRepository) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async getAllUsers(@Req() req: Request): Promise<User[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const userLogged = await this.userRepository.findOne({
      where: { id: req['user']['id'] },
      relations: ['authorities', 'adminWhiteLabel'],
    });
    const where: any = (userLogged.login !== 'admin' ? { adminWhiteLabel: userLogged.adminWhiteLabel } : {})
    const [results, count] = await this.userService.findAndCount({
      where: where,
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Post('/')
  @Roles(RoleType.USER)
  @ApiOperation({ description: 'Create user' })
  @ApiExcludeEndpoint()
  async createUser(@Req() req: Request, @Body() user: User): Promise<User> {
    user.createdDate = new Date();
    user.lastModifiedDate = new Date();
    user.createdBy = req['user']['id'];
    user.lastModifiedBy = req['user']['id'];

    const userLogged = await this.userRepository.findOne({
      where: { id: req['user']['id'] },
      relations: ['authorities', 'adminWhiteLabel'],
    });
    user.adminWhiteLabel = userLogged.adminWhiteLabel;

    const created = await this.userService.save(user);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'User', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async updateUser(@Req() req: Request, @Body() user: User): Promise<User> {
    user.lastModifiedDate = new Date();
    user.lastModifiedBy = req['user']['id'];
    const userLogged = await this.userRepository.findOne({
      where: { id: req['user']['id'] },
      relations: ['authorities', 'adminWhiteLabel'],
    });
    if (userLogged.adminWhiteLabel) {
      user.adminWhiteLabel = userLogged.adminWhiteLabel;
    }
    try {
      HeaderUtil.addEntityCreatedHeaders(req.res, 'User', user.id);
      return await this.userService.update(user);
    } catch (error) {
      return error;
    }
  }

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

  @Post('/profile-select-all')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async profileSelectAll(@Req() req: Request): Promise<any> {
    const profileSelectAll = await this.userService.profileSelectAll(req.body.profile, req.body.permission);
    return profileSelectAll;
  }

  @Post('/profile-unselect-all')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async profileUnselectAll(@Req() req: Request): Promise<any> {
    const profileUnselectAll = await this.userService.profileUnselectAll(req.body.profile, req.body.permission);
    return profileUnselectAll;
  }

  @Post('/user-select-all')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async userSelectAll(@Req() req: Request): Promise<any> {
    const userSelectAll = await this.userService.userSelectAll(req.body.user, req.body.permission);
    return userSelectAll;
  }

  @Post('/user-unselect-all')
  @Roles(RoleType.USER)
  @ApiExcludeEndpoint()
  async userUnselectAll(@Req() req: Request): Promise<any> {
    const userUnselectAll = await this.userService.userUnselectAll(req.body.user, req.body.permission);
    return userUnselectAll;
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
