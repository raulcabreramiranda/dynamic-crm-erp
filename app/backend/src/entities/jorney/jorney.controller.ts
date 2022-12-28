import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Jorney from './_base/jorney.entity';
import { JorneyController as JorneyControllerBase } from './_base/jorney.controller';

import { JorneyService } from './jorney.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/jorneys')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorneys')
export class JorneyController extends JorneyControllerBase {
    logger = new Logger('JorneyController');

    constructor(protected readonly authService: AuthService, protected readonly jorneyService: JorneyService, protected readonly userRepository: UserRepository) {
        super(authService, jorneyService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Jorney,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.jorneyService.findById('1');
    }
}
