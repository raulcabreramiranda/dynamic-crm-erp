import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import EssayPreUpload from './_base/essay-pre-upload.entity';
import { EssayPreUploadController as EssayPreUploadControllerBase } from './_base/essay-pre-upload.controller';

import { EssayPreUploadService } from './essay-pre-upload.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/essay-pre-uploads')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('essay-pre-uploads')
export class EssayPreUploadController extends EssayPreUploadControllerBase {
    logger = new Logger('EssayPreUploadController');

    constructor(protected readonly authService: AuthService, protected readonly essayPreUploadService: EssayPreUploadService, protected readonly userRepository: UserRepository) {
        super(authService, essayPreUploadService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: EssayPreUpload,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.essayPreUploadService.findById('1');
    }
}
