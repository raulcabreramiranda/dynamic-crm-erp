import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamsMasterKnowledgeArea from './_base/exams-master-knowledge-area.entity';
import { ExamsMasterKnowledgeAreaController as ExamsMasterKnowledgeAreaControllerBase } from './_base/exams-master-knowledge-area.controller';

import { ExamsMasterKnowledgeAreaService } from './exams-master-knowledge-area.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/exams-master-knowledge-areas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exams-master-knowledge-areas')
export class ExamsMasterKnowledgeAreaController extends ExamsMasterKnowledgeAreaControllerBase {
    logger = new Logger('ExamsMasterKnowledgeAreaController');

    constructor(protected readonly authService: AuthService, protected readonly examsMasterKnowledgeAreaService: ExamsMasterKnowledgeAreaService, protected readonly userRepository: UserRepository) {
        super(authService, examsMasterKnowledgeAreaService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ExamsMasterKnowledgeArea,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.examsMasterKnowledgeAreaService.findById('1');
    }
}
