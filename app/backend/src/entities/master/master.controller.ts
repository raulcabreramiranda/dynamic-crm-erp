import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Master from './_base/master.entity';
import { MasterController as MasterControllerBase } from './_base/master.controller';

import { MasterService } from './master.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/masters')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('masters')
export class MasterController extends MasterControllerBase {
    logger = new Logger('MasterController');

    constructor(protected readonly authService: AuthService, protected readonly masterService: MasterService, protected readonly userRepository: UserRepository) {
        super(authService, masterService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Master,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.masterService.findById('1');
    }
}
