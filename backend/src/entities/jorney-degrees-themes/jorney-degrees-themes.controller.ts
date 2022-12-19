import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import JorneyDegreesThemes from './_base/jorney-degrees-themes.entity';
import { JorneyDegreesThemesController as JorneyDegreesThemesControllerBase } from './_base/jorney-degrees-themes.controller';

import { JorneyDegreesThemesService } from './jorney-degrees-themes.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/jorney-degrees-themes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorney-degrees-themes')
export class JorneyDegreesThemesController extends JorneyDegreesThemesControllerBase {
    logger = new Logger('JorneyDegreesThemesController');

    constructor(protected readonly authService: AuthService, protected readonly jorneyDegreesThemesService: JorneyDegreesThemesService, protected readonly userRepository: UserRepository) {
        super(authService, jorneyDegreesThemesService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: JorneyDegreesThemes,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.jorneyDegreesThemesService.findById('1');
    }
}
