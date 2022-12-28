import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import CerneDegree from './_base/cerne-degree.entity';
import { CerneDegreeController as CerneDegreeControllerBase } from './_base/cerne-degree.controller';

import { CerneDegreeService } from './cerne-degree.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/cerne-degrees')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('cerne-degrees')
export class CerneDegreeController extends CerneDegreeControllerBase {
    logger = new Logger('CerneDegreeController');

    constructor(protected readonly authService: AuthService, protected readonly cerneDegreeService: CerneDegreeService, protected readonly userRepository: UserRepository) {
        super(authService, cerneDegreeService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: CerneDegree,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.cerneDegreeService.findById('1');
    }
}
