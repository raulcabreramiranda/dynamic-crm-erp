import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ConfigureCorrection from './_base/configure-correction.entity';
import { ConfigureCorrectionController as ConfigureCorrectionControllerBase } from './_base/configure-correction.controller';

import { ConfigureCorrectionService } from './configure-correction.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/configure-corrections')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('configure-corrections')
export class ConfigureCorrectionController extends ConfigureCorrectionControllerBase {
    logger = new Logger('ConfigureCorrectionController');

    constructor(protected readonly authService: AuthService, protected readonly configureCorrectionService: ConfigureCorrectionService, protected readonly userRepository: UserRepository) {
        super(authService, configureCorrectionService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ConfigureCorrection,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.configureCorrectionService.findById('1');
    }
}
