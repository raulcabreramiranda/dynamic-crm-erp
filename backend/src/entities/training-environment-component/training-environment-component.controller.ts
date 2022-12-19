import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import TrainingEnvironmentComponent from './_base/training-environment-component.entity';
import { TrainingEnvironmentComponentController as TrainingEnvironmentComponentControllerBase } from './_base/training-environment-component.controller';

import { TrainingEnvironmentComponentService } from './training-environment-component.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/training-environment-components')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('training-environment-components')
export class TrainingEnvironmentComponentController extends TrainingEnvironmentComponentControllerBase {
    logger = new Logger('TrainingEnvironmentComponentController');

    constructor(
        protected readonly authService: AuthService,
        protected readonly trainingEnvironmentComponentService: TrainingEnvironmentComponentService,
        protected readonly userRepository: UserRepository,
    ) {
        super(authService, trainingEnvironmentComponentService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: TrainingEnvironmentComponent,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.trainingEnvironmentComponentService.findById('1');
    }
}
