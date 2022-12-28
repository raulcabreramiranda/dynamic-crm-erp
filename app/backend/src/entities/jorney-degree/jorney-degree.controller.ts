import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import JorneyDegree from './_base/jorney-degree.entity';
import { JorneyDegreeController as JorneyDegreeControllerBase } from './_base/jorney-degree.controller';

import { JorneyDegreeService } from './jorney-degree.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/jorney-degrees')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorney-degrees')
export class JorneyDegreeController extends JorneyDegreeControllerBase {
    logger = new Logger('JorneyDegreeController');

    constructor(protected readonly authService: AuthService, protected readonly jorneyDegreeService: JorneyDegreeService, protected readonly userRepository: UserRepository) {
        super(authService, jorneyDegreeService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: JorneyDegree,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.jorneyDegreeService.findById('1');
    }
}
