import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import EssayExternalReview from './_base/essay-external-review.entity';
import { EssayExternalReviewController as EssayExternalReviewControllerBase } from './_base/essay-external-review.controller';

import { EssayExternalReviewService } from './essay-external-review.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/essay-external-reviews')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('essay-external-reviews')
export class EssayExternalReviewController extends EssayExternalReviewControllerBase {
    logger = new Logger('EssayExternalReviewController');

    constructor(protected readonly authService: AuthService, protected readonly essayExternalReviewService: EssayExternalReviewService, protected readonly userRepository: UserRepository) {
        super(authService, essayExternalReviewService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: EssayExternalReview,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.essayExternalReviewService.findById('1');
    }
}
