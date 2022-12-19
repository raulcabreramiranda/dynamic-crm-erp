import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import CernePlataform from './_base/cerne-plataform.entity';
import { CernePlataformController as CernePlataformControllerBase } from './_base/cerne-plataform.controller';

import { CernePlataformService } from './cerne-plataform.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/cerne-plataforms')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('cerne-plataforms')
export class CernePlataformController extends CernePlataformControllerBase {
    logger = new Logger('CernePlataformController');

    constructor(protected readonly authService: AuthService, protected readonly cernePlataformService: CernePlataformService, protected readonly userRepository: UserRepository) {
        super(authService, cernePlataformService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: CernePlataform,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.cernePlataformService.findById('1');
    }
}
