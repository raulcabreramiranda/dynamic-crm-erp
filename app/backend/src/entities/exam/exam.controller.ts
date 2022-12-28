import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Exam from './_base/exam.entity';
import { ExamController as ExamControllerBase } from './_base/exam.controller';

import { ExamService } from './exam.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exams')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exams')
export class ExamController extends ExamControllerBase {
    logger = new Logger('ExamController');

    constructor(protected readonly authService: AuthService, protected readonly examService: ExamService, protected readonly userRepository: UserRepository) {
        super(authService, examService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Exam,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examService.findById('1');
    }
}
