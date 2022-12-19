import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Essay from './_base/essay.entity';
import { EssayController as EssayControllerBase } from './_base/essay.controller';

import { EssayService } from './essay.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/essays')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('essays')
export class EssayController extends EssayControllerBase {
    logger = new Logger('EssayController');

    constructor(protected readonly authService: AuthService, protected readonly essayService: EssayService, protected readonly userRepository: UserRepository) {
        super(authService, essayService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Essay,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.essayService.findById('1');
    }
}
