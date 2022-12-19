import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionAlternative from './_base/question-alternative.entity';
import { QuestionAlternativeController as QuestionAlternativeControllerBase } from './_base/question-alternative.controller';

import { QuestionAlternativeService } from './question-alternative.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-alternatives')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-alternatives')
export class QuestionAlternativeController extends QuestionAlternativeControllerBase {
    logger = new Logger('QuestionAlternativeController');

    constructor(protected readonly authService: AuthService, protected readonly questionAlternativeService: QuestionAlternativeService, protected readonly userRepository: UserRepository) {
        super(authService, questionAlternativeService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionAlternative,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionAlternativeService.findById('1');
    }
}
