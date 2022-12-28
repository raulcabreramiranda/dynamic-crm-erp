import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import DisciplineSuperPro from './_base/discipline-super-pro.entity';
import { DisciplineSuperProController as DisciplineSuperProControllerBase } from './_base/discipline-super-pro.controller';

import { DisciplineSuperProService } from './discipline-super-pro.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/discipline-super-pros')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('discipline-super-pros')
export class DisciplineSuperProController extends DisciplineSuperProControllerBase {
    logger = new Logger('DisciplineSuperProController');

    constructor(protected readonly authService: AuthService, protected readonly disciplineSuperProService: DisciplineSuperProService, protected readonly userRepository: UserRepository) {
        super(authService, disciplineSuperProService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: DisciplineSuperPro,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.disciplineSuperProService.findById('1');
    }
}
