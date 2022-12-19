import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionLevel2 from './_base/question-level2.entity';
import { QuestionLevel2Controller as QuestionLevel2ControllerBase } from './_base/question-level2.controller';

import { QuestionLevel2Service } from './question-level2.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-level2s')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-level2s')
export class QuestionLevel2Controller extends QuestionLevel2ControllerBase {
    logger = new Logger('QuestionLevel2Controller');

    constructor(protected readonly authService: AuthService, protected readonly questionLevel2Service: QuestionLevel2Service, protected readonly userRepository: UserRepository) {
        super(authService, questionLevel2Service, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionLevel2,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionLevel2Service.findById('1');
    }
}
