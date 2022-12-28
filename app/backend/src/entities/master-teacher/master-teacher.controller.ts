import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import MasterTeacher from './_base/master-teacher.entity';
import { MasterTeacherController as MasterTeacherControllerBase } from './_base/master-teacher.controller';

import { MasterTeacherService } from './master-teacher.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/master-teachers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('master-teachers')
export class MasterTeacherController extends MasterTeacherControllerBase {
    logger = new Logger('MasterTeacherController');

    constructor(protected readonly authService: AuthService, protected readonly masterTeacherService: MasterTeacherService, protected readonly userRepository: UserRepository) {
        super(authService, masterTeacherService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: MasterTeacher,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.masterTeacherService.findById('1');
    }
}
