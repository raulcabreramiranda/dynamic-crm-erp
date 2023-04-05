import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminPermissionProfile from './_base/admin-permission-profile.entity';
import { AdminPermissionProfileController as AdminPermissionProfileControllerBase } from './_base/admin-permission-profile.controller';

import { AdminPermissionProfileService } from './admin-permission-profile.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-permission-profiles')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-permission-profiles')
export class AdminPermissionProfileController extends AdminPermissionProfileControllerBase {
    logger = new Logger('AdminPermissionProfileController');

    constructor(protected readonly authService: AuthService, protected readonly adminPermissionProfileService: AdminPermissionProfileService) {
        super(authService, adminPermissionProfileService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminPermissionProfile,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminPermissionProfileService.findById('1');
    }
}
