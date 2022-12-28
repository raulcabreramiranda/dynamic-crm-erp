import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import StudentQuestion from './_base/student-question.entity';
import { StudentQuestionController as StudentQuestionControllerBase } from './_base/student-question.controller';

import { StudentQuestionService } from './student-question.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/student-questions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('student-questions')
export class StudentQuestionController extends StudentQuestionControllerBase {
    logger = new Logger('StudentQuestionController');

    constructor(protected readonly authService: AuthService, protected readonly studentQuestionService: StudentQuestionService, protected readonly userRepository: UserRepository) {
        super(authService, studentQuestionService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: StudentQuestion,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.studentQuestionService.findById('1');
    }
}
