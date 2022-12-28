import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import JorneyGalerySection from './_base/jorney-galery-section.entity';
import { JorneyGalerySectionController as JorneyGalerySectionControllerBase } from './_base/jorney-galery-section.controller';

import { JorneyGalerySectionService } from './jorney-galery-section.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/jorney-galery-sections')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorney-galery-sections')
export class JorneyGalerySectionController extends JorneyGalerySectionControllerBase {
    logger = new Logger('JorneyGalerySectionController');

    constructor(protected readonly authService: AuthService, protected readonly jorneyGalerySectionService: JorneyGalerySectionService, protected readonly userRepository: UserRepository) {
        super(authService, jorneyGalerySectionService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: JorneyGalerySection,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.jorneyGalerySectionService.findById('1');
    }
}
