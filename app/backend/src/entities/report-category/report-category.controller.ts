import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ReportCategory from './_base/report-category.entity';
import { ReportCategoryController as ReportCategoryControllerBase } from './_base/report-category.controller';

import { ReportCategoryService } from './report-category.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/report-categories')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('report-categories')
export class ReportCategoryController extends ReportCategoryControllerBase {
    logger = new Logger('ReportCategoryController');

    constructor(protected readonly authService: AuthService, protected readonly reportCategoryService: ReportCategoryService, protected readonly userRepository: UserRepository) {
        super(authService, reportCategoryService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ReportCategory,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.reportCategoryService.findById('1');
    }
}
