import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import BusinessEntity from './_base/business-entity.entity';
import { BusinessEntityController as BusinessEntityControllerBase } from './_base/business-entity.controller';

import { BusinessEntityService } from './business-entity.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/business-entities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('business-entities')
export class BusinessEntityController extends BusinessEntityControllerBase {
    logger = new Logger('BusinessEntityController');

    constructor(protected readonly authService: AuthService, protected readonly businessEntityService: BusinessEntityService) {
        super(authService, businessEntityService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: BusinessEntity,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.businessEntityService.findById('1');
    }
}
