import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import CerneSchool from './_base/cerne-school.entity';
import { CerneSchoolController as CerneSchoolControllerBase } from './_base/cerne-school.controller';

import { CerneSchoolService } from './cerne-school.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/cerne-schools')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('cerne-schools')
export class CerneSchoolController extends CerneSchoolControllerBase {
    logger = new Logger('CerneSchoolController');

    constructor(protected readonly authService: AuthService, protected readonly cerneSchoolService: CerneSchoolService, protected readonly userRepository: UserRepository) {
        super(authService, cerneSchoolService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: CerneSchool,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.cerneSchoolService.findById('1');
    }
}
