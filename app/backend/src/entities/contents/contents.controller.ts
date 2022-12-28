import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Contents from './_base/contents.entity';
import { ContentsController as ContentsControllerBase } from './_base/contents.controller';

import { ContentsService } from './contents.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/contents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('contents')
export class ContentsController extends ContentsControllerBase {
    logger = new Logger('ContentsController');

    constructor(protected readonly authService: AuthService, protected readonly contentsService: ContentsService, protected readonly userRepository: UserRepository) {
        super(authService, contentsService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Contents,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.contentsService.findById('1');
    }
}
