import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ReportSubquery from './_base/report-subquery.entity';
import { ReportSubqueryController as ReportSubqueryControllerBase } from './_base/report-subquery.controller';

import { ReportSubqueryService } from './report-subquery.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/report-subqueries')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('report-subqueries')
export class ReportSubqueryController extends ReportSubqueryControllerBase {
    logger = new Logger('ReportSubqueryController');

    constructor(protected readonly authService: AuthService, protected readonly reportSubqueryService: ReportSubqueryService, protected readonly userRepository: UserRepository) {
        super(authService, reportSubqueryService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ReportSubquery,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.reportSubqueryService.findById('1');
    }
}
