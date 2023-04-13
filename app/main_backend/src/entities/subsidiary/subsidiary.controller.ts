import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Subsidiary from './_base/subsidiary.entity';
import { SubsidiaryController as SubsidiaryControllerBase } from './_base/subsidiary.controller';

import { SubsidiaryService } from './subsidiary.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/subsidiaries')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('subsidiaries')
export class SubsidiaryController extends SubsidiaryControllerBase {
    logger = new Logger('SubsidiaryController');

    constructor(protected readonly authService: AuthService, protected readonly subsidiaryService: SubsidiaryService) {
        super(authService, subsidiaryService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Subsidiary,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.subsidiaryService.findById('1');
    }
}
