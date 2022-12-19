import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ConfigureCorrectionReviewer from './_base/configure-correction-reviewer.entity';
import { ConfigureCorrectionReviewerController as ConfigureCorrectionReviewerControllerBase } from './_base/configure-correction-reviewer.controller';

import { ConfigureCorrectionReviewerService } from './configure-correction-reviewer.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/configure-correction-reviewers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('configure-correction-reviewers')
export class ConfigureCorrectionReviewerController extends ConfigureCorrectionReviewerControllerBase {
    logger = new Logger('ConfigureCorrectionReviewerController');

    constructor(
        protected readonly authService: AuthService,
        protected readonly configureCorrectionReviewerService: ConfigureCorrectionReviewerService,
        protected readonly userRepository: UserRepository,
    ) {
        super(authService, configureCorrectionReviewerService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ConfigureCorrectionReviewer,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.configureCorrectionReviewerService.findById('1');
    }
}
