import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamsMaster from './_base/exams-master.entity';
import { ExamsMasterController as ExamsMasterControllerBase } from './_base/exams-master.controller';

import { ExamsMasterService } from './exams-master.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exams-masters')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exams-masters')
export class ExamsMasterController extends ExamsMasterControllerBase {
    logger = new Logger('ExamsMasterController');

    constructor(protected readonly authService: AuthService, protected readonly examsMasterService: ExamsMasterService, protected readonly userRepository: UserRepository) {
        super(authService, examsMasterService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ExamsMaster,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examsMasterService.findById('1');
    }
}
