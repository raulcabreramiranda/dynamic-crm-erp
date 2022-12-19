import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamTemplate from './_base/exam-template.entity';
import { ExamTemplateController as ExamTemplateControllerBase } from './_base/exam-template.controller';

import { ExamTemplateService } from './exam-template.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exam-templates')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exam-templates')
export class ExamTemplateController extends ExamTemplateControllerBase {
    logger = new Logger('ExamTemplateController');

    constructor(protected readonly authService: AuthService, protected readonly examTemplateService: ExamTemplateService, protected readonly userRepository: UserRepository) {
        super(authService, examTemplateService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ExamTemplate,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examTemplateService.findById('1');
    }
}
