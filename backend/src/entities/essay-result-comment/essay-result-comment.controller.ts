import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import EssayResultComment from './_base/essay-result-comment.entity';
import { EssayResultCommentController as EssayResultCommentControllerBase } from './_base/essay-result-comment.controller';

import { EssayResultCommentService } from './essay-result-comment.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/essay-result-comments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('essay-result-comments')
export class EssayResultCommentController extends EssayResultCommentControllerBase {
    logger = new Logger('EssayResultCommentController');

    constructor(protected readonly authService: AuthService, protected readonly essayResultCommentService: EssayResultCommentService, protected readonly userRepository: UserRepository) {
        super(authService, essayResultCommentService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: EssayResultComment,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.essayResultCommentService.findById('1');
    }
}
