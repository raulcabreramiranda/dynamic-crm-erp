import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import StudentExam from './_base/student-exam.entity';
import { StudentExamController as StudentExamControllerBase } from './_base/student-exam.controller';

import { StudentExamService } from './student-exam.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/student-exams')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('student-exams')
export class StudentExamController extends StudentExamControllerBase {
    logger = new Logger('StudentExamController');

    constructor(protected readonly authService: AuthService, protected readonly studentExamService: StudentExamService, protected readonly userRepository: UserRepository) {
        super(authService, studentExamService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: StudentExam,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.studentExamService.findById('1');
    }
}
