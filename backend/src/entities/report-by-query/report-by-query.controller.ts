import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ReportByQuery from './_base/report-by-query.entity';
import { ReportByQueryController as ReportByQueryControllerBase } from './_base/report-by-query.controller';

import { ReportByQueryService } from './report-by-query.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/report-by-queries')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('report-by-queries')
export class ReportByQueryController extends ReportByQueryControllerBase {
    logger = new Logger('ReportByQueryController');

    constructor(protected readonly authService: AuthService, protected readonly reportByQueryService: ReportByQueryService, protected readonly userRepository: UserRepository) {
        super(authService, reportByQueryService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ReportByQuery,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.reportByQueryService.findById('1');
    }
}
