import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ContentsMasterTeacher from './_base/contents-master-teacher.entity';
import { ContentsMasterTeacherController as ContentsMasterTeacherControllerBase } from './_base/contents-master-teacher.controller';

import { ContentsMasterTeacherService } from './contents-master-teacher.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/contents-master-teachers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('contents-master-teachers')
export class ContentsMasterTeacherController extends ContentsMasterTeacherControllerBase {
    logger = new Logger('ContentsMasterTeacherController');

    constructor(protected readonly authService: AuthService, protected readonly contentsMasterTeacherService: ContentsMasterTeacherService, protected readonly userRepository: UserRepository) {
        super(authService, contentsMasterTeacherService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ContentsMasterTeacher,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.contentsMasterTeacherService.findById('1');
    }
}
