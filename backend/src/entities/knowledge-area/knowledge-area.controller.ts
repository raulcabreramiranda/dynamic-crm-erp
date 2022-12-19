import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import KnowledgeArea from './_base/knowledge-area.entity';
import { KnowledgeAreaController as KnowledgeAreaControllerBase } from './_base/knowledge-area.controller';

import { KnowledgeAreaService } from './knowledge-area.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/knowledge-areas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('knowledge-areas')
export class KnowledgeAreaController extends KnowledgeAreaControllerBase {
    logger = new Logger('KnowledgeAreaController');

    constructor(protected readonly authService: AuthService, protected readonly knowledgeAreaService: KnowledgeAreaService, protected readonly userRepository: UserRepository) {
        super(authService, knowledgeAreaService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: KnowledgeArea,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.knowledgeAreaService.findById('1');
    }
}
