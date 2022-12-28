import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionLevel4 from './_base/question-level4.entity';
import { QuestionLevel4Controller as QuestionLevel4ControllerBase } from './_base/question-level4.controller';

import { QuestionLevel4Service } from './question-level4.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-level4s')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-level4s')
export class QuestionLevel4Controller extends QuestionLevel4ControllerBase {
    logger = new Logger('QuestionLevel4Controller');

    constructor(protected readonly authService: AuthService, protected readonly questionLevel4Service: QuestionLevel4Service, protected readonly userRepository: UserRepository) {
        super(authService, questionLevel4Service, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionLevel4,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionLevel4Service.findById('1');
    }
}
