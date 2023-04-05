import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminAuthority from './_base/admin-authority.entity';
import { AdminAuthorityController as AdminAuthorityControllerBase } from './_base/admin-authority.controller';

import { AdminAuthorityService } from './admin-authority.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-authorities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-authorities')
export class AdminAuthorityController extends AdminAuthorityControllerBase {
    logger = new Logger('AdminAuthorityController');

    constructor(protected readonly authService: AuthService, protected readonly adminAuthorityService: AdminAuthorityService) {
        super(authService, adminAuthorityService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminAuthority,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminAuthorityService.findById('1');
    }
}
