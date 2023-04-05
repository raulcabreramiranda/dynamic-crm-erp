import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Photo from './_base/photo.entity';
import { PhotoController as PhotoControllerBase } from './_base/photo.controller';

import { PhotoService } from './photo.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/photos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('photos')
export class PhotoController extends PhotoControllerBase {
    logger = new Logger('PhotoController');

    constructor(protected readonly authService: AuthService, protected readonly photoService: PhotoService) {
        super(authService, photoService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Photo,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.photoService.findById('1');
    }
}
