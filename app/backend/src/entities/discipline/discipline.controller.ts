import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Discipline from './_base/discipline.entity';
import { DisciplineController as DisciplineControllerBase } from './_base/discipline.controller';

import { DisciplineService } from './discipline.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/disciplines')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('disciplines')
export class DisciplineController extends DisciplineControllerBase {
    logger = new Logger('DisciplineController');

    constructor(protected readonly authService: AuthService, protected readonly disciplineService: DisciplineService, protected readonly userRepository: UserRepository) {
        super(authService, disciplineService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Discipline,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.disciplineService.findById('1');
    }
}
