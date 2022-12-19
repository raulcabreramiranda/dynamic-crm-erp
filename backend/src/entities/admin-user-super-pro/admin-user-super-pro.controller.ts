import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminUserSuperPro from './_base/admin-user-super-pro.entity';
import { AdminUserSuperProController as AdminUserSuperProControllerBase } from './_base/admin-user-super-pro.controller';

import { AdminUserSuperProService } from './admin-user-super-pro.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/admin-user-super-pros')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-user-super-pros')
export class AdminUserSuperProController extends AdminUserSuperProControllerBase {
    logger = new Logger('AdminUserSuperProController');

    constructor(protected readonly authService: AuthService, protected readonly adminUserSuperProService: AdminUserSuperProService, protected readonly userRepository: UserRepository) {
        super(authService, adminUserSuperProService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminUserSuperPro,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminUserSuperProService.findById('1');
    }
}
