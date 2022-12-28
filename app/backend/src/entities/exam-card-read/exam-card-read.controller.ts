import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamCardRead from './_base/exam-card-read.entity';
import { ExamCardReadController as ExamCardReadControllerBase } from './_base/exam-card-read.controller';

import { ExamCardReadService } from './exam-card-read.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exam-card-reads')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exam-card-reads')
export class ExamCardReadController extends ExamCardReadControllerBase {
    logger = new Logger('ExamCardReadController');

    constructor(protected readonly authService: AuthService, protected readonly examCardReadService: ExamCardReadService, protected readonly userRepository: UserRepository) {
        super(authService, examCardReadService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ExamCardRead,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examCardReadService.findById('1');
    }
}
