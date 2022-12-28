import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import JorneyGalery from './_base/jorney-galery.entity';
import { JorneyGaleryController as JorneyGaleryControllerBase } from './_base/jorney-galery.controller';

import { JorneyGaleryService } from './jorney-galery.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/jorney-galeries')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorney-galeries')
export class JorneyGaleryController extends JorneyGaleryControllerBase {
    logger = new Logger('JorneyGaleryController');

    constructor(protected readonly authService: AuthService, protected readonly jorneyGaleryService: JorneyGaleryService, protected readonly userRepository: UserRepository) {
        super(authService, jorneyGaleryService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: JorneyGalery,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.jorneyGaleryService.findById('1');
    }
}
