import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionLevels from './_base/question-levels.entity';
import { QuestionLevelsController as QuestionLevelsControllerBase } from './_base/question-levels.controller';

import { QuestionLevelsService } from './question-levels.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-levels')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-levels')
export class QuestionLevelsController extends QuestionLevelsControllerBase {
    logger = new Logger('QuestionLevelsController');

    constructor(protected readonly authService: AuthService, protected readonly questionLevelsService: QuestionLevelsService, protected readonly userRepository: UserRepository) {
        super(authService, questionLevelsService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionLevels,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionLevelsService.findById('1');
    }
}
