import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import QuestionImportTemplate from './_base/question-import-template.entity';
import { QuestionImportTemplateController as QuestionImportTemplateControllerBase } from './_base/question-import-template.controller';

import { QuestionImportTemplateService } from './question-import-template.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/question-import-templates')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('question-import-templates')
export class QuestionImportTemplateController extends QuestionImportTemplateControllerBase {
    logger = new Logger('QuestionImportTemplateController');

    constructor(protected readonly authService: AuthService, protected readonly questionImportTemplateService: QuestionImportTemplateService, protected readonly userRepository: UserRepository) {
        super(authService, questionImportTemplateService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: QuestionImportTemplate,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.questionImportTemplateService.findById('1');
    }
}
