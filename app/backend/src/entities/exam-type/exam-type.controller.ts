import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamType from './_base/exam-type.entity';
import { ExamTypeController as ExamTypeControllerBase } from './_base/exam-type.controller';

import { ExamTypeService } from './exam-type.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exam-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exam-types')
export class ExamTypeController extends ExamTypeControllerBase {
    logger = new Logger('ExamTypeController');

    constructor(protected readonly authService: AuthService, protected readonly examTypeService: ExamTypeService, protected readonly userRepository: UserRepository) {
        super(authService, examTypeService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ExamType,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examTypeService.findById('1');
    }
}
