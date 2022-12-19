import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionLevel3 from './_base/question-level3.entity';
import { QuestionLevel3Controller as QuestionLevel3ControllerBase } from './_base/question-level3.controller';

import { QuestionLevel3Service } from './question-level3.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-level3s')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-level3s')
export class QuestionLevel3Controller extends QuestionLevel3ControllerBase {
    logger = new Logger('QuestionLevel3Controller');

    constructor(protected readonly authService: AuthService, protected readonly questionLevel3Service: QuestionLevel3Service, protected readonly userRepository: UserRepository) {
        super(authService, questionLevel3Service, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionLevel3,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionLevel3Service.findById('1');
    }
}
