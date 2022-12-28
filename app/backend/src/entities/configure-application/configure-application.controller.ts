import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ConfigureApplication from './_base/configure-application.entity';
import { ConfigureApplicationController as ConfigureApplicationControllerBase } from './_base/configure-application.controller';

import { ConfigureApplicationService } from './configure-application.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/configure-applications')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('configure-applications')
export class ConfigureApplicationController extends ConfigureApplicationControllerBase {
    logger = new Logger('ConfigureApplicationController');

    constructor(protected readonly authService: AuthService, protected readonly configureApplicationService: ConfigureApplicationService, protected readonly userRepository: UserRepository) {
        super(authService, configureApplicationService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ConfigureApplication,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.configureApplicationService.findById('1');
    }
}
