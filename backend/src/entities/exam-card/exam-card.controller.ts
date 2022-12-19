import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamCard from './_base/exam-card.entity';
import { ExamCardController as ExamCardControllerBase } from './_base/exam-card.controller';

import { ExamCardService } from './exam-card.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exam-cards')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exam-cards')
export class ExamCardController extends ExamCardControllerBase {
    logger = new Logger('ExamCardController');

    constructor(protected readonly authService: AuthService, protected readonly examCardService: ExamCardService, protected readonly userRepository: UserRepository) {
        super(authService, examCardService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ExamCard,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examCardService.findById('1');
    }
}
