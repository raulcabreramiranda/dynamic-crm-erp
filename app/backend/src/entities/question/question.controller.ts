import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Question from './_base/question.entity';
import { QuestionController as QuestionControllerBase } from './_base/question.controller';

import { QuestionService } from './question.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/questions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('questions')
export class QuestionController extends QuestionControllerBase {
    logger = new Logger('QuestionController');

    constructor(protected readonly authService: AuthService, protected readonly questionService: QuestionService, protected readonly userRepository: UserRepository) {
        super(authService, questionService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Question,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionService.findById('1');
    }
}
