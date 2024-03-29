import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminPermission from './_base/admin-permission.entity';
import { AdminPermissionController as AdminPermissionControllerBase } from './_base/admin-permission.controller';

import { AdminPermissionService } from './admin-permission.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-permissions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-permissions')
export class AdminPermissionController extends AdminPermissionControllerBase {
    logger = new Logger('AdminPermissionController');

    constructor(protected readonly authService: AuthService, protected readonly adminPermissionService: AdminPermissionService) {
        super(authService, adminPermissionService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminPermission,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminPermissionService.findById('1');
    }
}
