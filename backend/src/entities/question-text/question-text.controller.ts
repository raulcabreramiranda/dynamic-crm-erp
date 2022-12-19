import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionText from './_base/question-text.entity';
import { QuestionTextController as QuestionTextControllerBase } from './_base/question-text.controller';

import { QuestionTextService } from './question-text.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-texts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-texts')
export class QuestionTextController extends QuestionTextControllerBase {
    logger = new Logger('QuestionTextController');

    constructor(protected readonly authService: AuthService, protected readonly questionTextService: QuestionTextService, protected readonly userRepository: UserRepository) {
        super(authService, questionTextService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionText,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionTextService.findById('1');
    }
}
