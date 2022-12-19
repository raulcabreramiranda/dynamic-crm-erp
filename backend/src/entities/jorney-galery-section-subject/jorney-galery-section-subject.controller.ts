import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import JorneyGalerySectionSubject from './_base/jorney-galery-section-subject.entity';
import { JorneyGalerySectionSubjectController as JorneyGalerySectionSubjectControllerBase } from './_base/jorney-galery-section-subject.controller';

import { JorneyGalerySectionSubjectService } from './jorney-galery-section-subject.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/jorney-galery-section-subjects')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorney-galery-section-subjects')
export class JorneyGalerySectionSubjectController extends JorneyGalerySectionSubjectControllerBase {
    logger = new Logger('JorneyGalerySectionSubjectController');

    constructor(
        protected readonly authService: AuthService,
        protected readonly jorneyGalerySectionSubjectService: JorneyGalerySectionSubjectService,
        protected readonly userRepository: UserRepository,
    ) {
        super(authService, jorneyGalerySectionSubjectService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: JorneyGalerySectionSubject,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.jorneyGalerySectionSubjectService.findById('1');
    }
}
