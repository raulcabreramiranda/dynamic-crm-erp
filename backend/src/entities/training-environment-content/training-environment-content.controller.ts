import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import TrainingEnvironmentContent from './_base/training-environment-content.entity';
import { TrainingEnvironmentContentController as TrainingEnvironmentContentControllerBase } from './_base/training-environment-content.controller';

import { TrainingEnvironmentContentService } from './training-environment-content.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/training-environment-contents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('training-environment-contents')
export class TrainingEnvironmentContentController extends TrainingEnvironmentContentControllerBase {
    logger = new Logger('TrainingEnvironmentContentController');

    constructor(
        protected readonly authService: AuthService,
        protected readonly trainingEnvironmentContentService: TrainingEnvironmentContentService,
        protected readonly userRepository: UserRepository,
    ) {
        super(authService, trainingEnvironmentContentService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: TrainingEnvironmentContent,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.trainingEnvironmentContentService.findById('1');
    }
}
