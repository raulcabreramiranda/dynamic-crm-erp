import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionLevel1 from './_base/question-level1.entity';
import { QuestionLevel1Controller as QuestionLevel1ControllerBase } from './_base/question-level1.controller';

import { QuestionLevel1Service } from './question-level1.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-level1s')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-level1s')
export class QuestionLevel1Controller extends QuestionLevel1ControllerBase {
    logger = new Logger('QuestionLevel1Controller');

    constructor(protected readonly authService: AuthService, protected readonly questionLevel1Service: QuestionLevel1Service, protected readonly userRepository: UserRepository) {
        super(authService, questionLevel1Service, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionLevel1,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionLevel1Service.findById('1');
    }
}
