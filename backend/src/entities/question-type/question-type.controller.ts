import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionType from './_base/question-type.entity';
import { QuestionTypeController as QuestionTypeControllerBase } from './_base/question-type.controller';

import { QuestionTypeService } from './question-type.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-types')
export class QuestionTypeController extends QuestionTypeControllerBase {
    logger = new Logger('QuestionTypeController');

    constructor(protected readonly authService: AuthService, protected readonly questionTypeService: QuestionTypeService, protected readonly userRepository: UserRepository) {
        super(authService, questionTypeService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionType,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionTypeService.findById('1');
    }
}
