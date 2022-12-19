import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Theme from './_base/theme.entity';
import { ThemeController as ThemeControllerBase } from './_base/theme.controller';

import { ThemeService } from './theme.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/themes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('themes')
export class ThemeController extends ThemeControllerBase {
    logger = new Logger('ThemeController');

    constructor(protected readonly authService: AuthService, protected readonly themeService: ThemeService, protected readonly userRepository: UserRepository) {
        super(authService, themeService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Theme,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.themeService.findById('1');
    }
}
