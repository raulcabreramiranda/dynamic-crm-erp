import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionMatrix from './_base/question-matrix.entity';
import { QuestionMatrixController as QuestionMatrixControllerBase } from './_base/question-matrix.controller';

import { QuestionMatrixService } from './question-matrix.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-matrices')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-matrices')
export class QuestionMatrixController extends QuestionMatrixControllerBase {
    logger = new Logger('QuestionMatrixController');

    constructor(protected readonly authService: AuthService, protected readonly questionMatrixService: QuestionMatrixService, protected readonly userRepository: UserRepository) {
        super(authService, questionMatrixService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionMatrix,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionMatrixService.findById('1');
    }
}
