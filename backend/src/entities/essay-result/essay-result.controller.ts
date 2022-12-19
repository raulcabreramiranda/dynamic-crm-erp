import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import EssayResult from './_base/essay-result.entity';
import { EssayResultController as EssayResultControllerBase } from './_base/essay-result.controller';

import { EssayResultService } from './essay-result.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/essay-results')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('essay-results')
export class EssayResultController extends EssayResultControllerBase {
    logger = new Logger('EssayResultController');

    constructor(protected readonly authService: AuthService, protected readonly essayResultService: EssayResultService, protected readonly userRepository: UserRepository) {
        super(authService, essayResultService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: EssayResult,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.essayResultService.findById('1');
    }
}
