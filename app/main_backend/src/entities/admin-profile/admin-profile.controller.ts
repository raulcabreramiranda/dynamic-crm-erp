import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminProfile from './_base/admin-profile.entity';
import { AdminProfileController as AdminProfileControllerBase } from './_base/admin-profile.controller';

import { AdminProfileService } from './admin-profile.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/admin-profiles')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-profiles')
export class AdminProfileController extends AdminProfileControllerBase {
    logger = new Logger('AdminProfileController');

    constructor(protected readonly authService: AuthService, protected readonly adminProfileService: AdminProfileService) {
        super(authService, adminProfileService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminProfile,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminProfileService.findById('1');
    }
}
