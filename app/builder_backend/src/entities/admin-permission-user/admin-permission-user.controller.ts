import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminPermissionUser from './_base/admin-permission-user.entity';
import { AdminPermissionUserController as AdminPermissionUserControllerBase } from './_base/admin-permission-user.controller';

import { AdminPermissionUserService } from './admin-permission-user.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/admin-permission-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-permission-users')
export class AdminPermissionUserController extends AdminPermissionUserControllerBase {
    logger = new Logger('AdminPermissionUserController');

    constructor(protected readonly authService: AuthService, protected readonly adminPermissionUserService: AdminPermissionUserService) {
        super(authService, adminPermissionUserService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminPermissionUser,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminPermissionUserService.findById('1');
    }
}
