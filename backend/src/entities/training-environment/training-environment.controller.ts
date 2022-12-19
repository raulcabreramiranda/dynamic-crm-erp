import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import TrainingEnvironment from './_base/training-environment.entity';
import { TrainingEnvironmentController as TrainingEnvironmentControllerBase } from './_base/training-environment.controller';

import { TrainingEnvironmentService } from './training-environment.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/training-environments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('training-environments')
export class TrainingEnvironmentController extends TrainingEnvironmentControllerBase {
    logger = new Logger('TrainingEnvironmentController');

    constructor(protected readonly authService: AuthService, protected readonly trainingEnvironmentService: TrainingEnvironmentService, protected readonly userRepository: UserRepository) {
        super(authService, trainingEnvironmentService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: TrainingEnvironment,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.trainingEnvironmentService.findById('1');
    }
}
