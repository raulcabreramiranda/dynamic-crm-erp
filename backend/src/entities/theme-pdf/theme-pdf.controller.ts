import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ThemePdf from './_base/theme-pdf.entity';
import { ThemePdfController as ThemePdfControllerBase } from './_base/theme-pdf.controller';

import { ThemePdfService } from './theme-pdf.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/theme-pdfs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('theme-pdfs')
export class ThemePdfController extends ThemePdfControllerBase {
    logger = new Logger('ThemePdfController');

    constructor(protected readonly authService: AuthService, protected readonly themePdfService: ThemePdfService, protected readonly userRepository: UserRepository) {
        super(authService, themePdfService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: ThemePdf,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.themePdfService.findById('1');
    }
}
