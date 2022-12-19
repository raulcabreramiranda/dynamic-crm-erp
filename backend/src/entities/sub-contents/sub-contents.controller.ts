import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import SubContents from './_base/sub-contents.entity';
import { SubContentsController as SubContentsControllerBase } from './_base/sub-contents.controller';

import { SubContentsService } from './sub-contents.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/sub-contents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('sub-contents')
export class SubContentsController extends SubContentsControllerBase {
    logger = new Logger('SubContentsController');

    constructor(protected readonly authService: AuthService, protected readonly subContentsService: SubContentsService, protected readonly userRepository: UserRepository) {
        super(authService, subContentsService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: SubContents,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.subContentsService.findById('1');
    }
}
