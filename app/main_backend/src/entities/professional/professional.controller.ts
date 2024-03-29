import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Professional from './_base/professional.entity';
import { ProfessionalController as ProfessionalControllerBase } from './_base/professional.controller';

import { ProfessionalService } from './professional.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/professionals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('professionals')
export class ProfessionalController extends ProfessionalControllerBase {
    logger = new Logger('ProfessionalController');

    constructor(protected readonly authService: AuthService, protected readonly professionalService: ProfessionalService) {
        super(authService, professionalService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Professional,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.professionalService.findById('1');
    }
}
