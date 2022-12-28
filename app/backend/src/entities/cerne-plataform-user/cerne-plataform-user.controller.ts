import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import CernePlataformUser from './_base/cerne-plataform-user.entity';
import { CernePlataformUserController as CernePlataformUserControllerBase } from './_base/cerne-plataform-user.controller';

import { CernePlataformUserService } from './cerne-plataform-user.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/cerne-plataform-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('cerne-plataform-users')
export class CernePlataformUserController extends CernePlataformUserControllerBase {
    logger = new Logger('CernePlataformUserController');

    constructor(protected readonly authService: AuthService, protected readonly cernePlataformUserService: CernePlataformUserService, protected readonly userRepository: UserRepository) {
        super(authService, cernePlataformUserService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: CernePlataformUser,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.cernePlataformUserService.findById('1');
    }
}
