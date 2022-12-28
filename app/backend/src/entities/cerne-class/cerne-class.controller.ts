import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import CerneClass from './_base/cerne-class.entity';
import { CerneClassController as CerneClassControllerBase } from './_base/cerne-class.controller';

import { CerneClassService } from './cerne-class.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/cerne-classes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('cerne-classes')
export class CerneClassController extends CerneClassControllerBase {
    logger = new Logger('CerneClassController');

    constructor(protected readonly authService: AuthService, protected readonly cerneClassService: CerneClassService, protected readonly userRepository: UserRepository) {
        super(authService, cerneClassService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: CerneClass,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.cerneClassService.findById('1');
    }
}
