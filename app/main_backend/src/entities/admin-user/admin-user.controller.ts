import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminUser from './_base/admin-user.entity';
import { AdminUserController as AdminUserControllerBase } from './_base/admin-user.controller';

import { AdminUserService } from './admin-user.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/admin-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-users')
export class AdminUserController extends AdminUserControllerBase {
    logger = new Logger('AdminUserController');

    constructor(protected readonly authService: AuthService, protected readonly adminUserService: AdminUserService) {
        super(authService, adminUserService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminUser,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminUserService.findById('1');
    }
}
