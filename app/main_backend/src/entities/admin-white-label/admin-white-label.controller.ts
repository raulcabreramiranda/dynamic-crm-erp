import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminWhiteLabel from './_base/admin-white-label.entity';
import { AdminWhiteLabelController as AdminWhiteLabelControllerBase } from './_base/admin-white-label.controller';

import { AdminWhiteLabelService } from './admin-white-label.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-white-labels')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-white-labels')
export class AdminWhiteLabelController extends AdminWhiteLabelControllerBase {
    logger = new Logger('AdminWhiteLabelController');

    constructor(protected readonly authService: AuthService, protected readonly adminWhiteLabelService: AdminWhiteLabelService) {
        super(authService, adminWhiteLabelService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminWhiteLabel,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminWhiteLabelService.findById('1');
    }
}
