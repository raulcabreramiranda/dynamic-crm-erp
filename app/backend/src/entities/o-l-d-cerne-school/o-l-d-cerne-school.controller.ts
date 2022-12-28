import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import OLDCerneSchool from './_base/o-l-d-cerne-school.entity';
import { OLDCerneSchoolController as OLDCerneSchoolControllerBase } from './_base/o-l-d-cerne-school.controller';

import { OLDCerneSchoolService } from './o-l-d-cerne-school.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/o-l-d-cerne-schools')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('o-l-d-cerne-schools')
export class OLDCerneSchoolController extends OLDCerneSchoolControllerBase {
    logger = new Logger('OLDCerneSchoolController');

    constructor(protected readonly authService: AuthService, protected readonly oLDCerneSchoolService: OLDCerneSchoolService, protected readonly userRepository: UserRepository) {
        super(authService, oLDCerneSchoolService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: OLDCerneSchool,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.oLDCerneSchoolService.findById('1');
    }
}
