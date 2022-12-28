import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Font from './_base/font.entity';
import { FontController as FontControllerBase } from './_base/font.controller';

import { FontService } from './font.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/fonts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('fonts')
export class FontController extends FontControllerBase {
    logger = new Logger('FontController');

    constructor(protected readonly authService: AuthService, protected readonly fontService: FontService, protected readonly userRepository: UserRepository) {
        super(authService, fontService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Font,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.fontService.findById('1');
    }
}
