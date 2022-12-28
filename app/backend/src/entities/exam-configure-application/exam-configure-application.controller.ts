import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamConfigureApplication from './_base/exam-configure-application.entity';
import { ExamConfigureApplicationController as ExamConfigureApplicationControllerBase } from './_base/exam-configure-application.controller';

import { ExamConfigureApplicationService } from './exam-configure-application.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exam-configure-applications')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exam-configure-applications')
export class ExamConfigureApplicationController extends ExamConfigureApplicationControllerBase {
    logger = new Logger('ExamConfigureApplicationController');

    constructor(protected readonly authService: AuthService, protected readonly examConfigureApplicationService: ExamConfigureApplicationService, protected readonly userRepository: UserRepository) {
        super(authService, examConfigureApplicationService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ExamConfigureApplication,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examConfigureApplicationService.findById('1');
    }
}
