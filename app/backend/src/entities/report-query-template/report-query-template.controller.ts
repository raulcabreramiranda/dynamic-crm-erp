import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ReportQueryTemplate from './_base/report-query-template.entity';
import { ReportQueryTemplateController as ReportQueryTemplateControllerBase } from './_base/report-query-template.controller';

import { ReportQueryTemplateService } from './report-query-template.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/report-query-templates')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('report-query-templates')
export class ReportQueryTemplateController extends ReportQueryTemplateControllerBase {
    logger = new Logger('ReportQueryTemplateController');

    constructor(protected readonly authService: AuthService, protected readonly reportQueryTemplateService: ReportQueryTemplateService, protected readonly userRepository: UserRepository) {
        super(authService, reportQueryTemplateService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ReportQueryTemplate,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.reportQueryTemplateService.findById('1');
    }
}
