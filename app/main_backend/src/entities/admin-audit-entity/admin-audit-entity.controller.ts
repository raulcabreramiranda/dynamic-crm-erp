import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminAuditEntity from './_base/admin-audit-entity.entity';
import { AdminAuditEntityController as AdminAuditEntityControllerBase } from './_base/admin-audit-entity.controller';

import { AdminAuditEntityService } from './admin-audit-entity.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-audit-entities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-audit-entities')
export class AdminAuditEntityController extends AdminAuditEntityControllerBase {
    logger = new Logger('AdminAuditEntityController');

    constructor(protected readonly authService: AuthService, protected readonly adminAuditEntityService: AdminAuditEntityService) {
        super(authService, adminAuditEntityService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: AdminAuditEntity,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.adminAuditEntityService.findById('1');
    }
}
