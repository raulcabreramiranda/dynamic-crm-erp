import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import BusinessEntityField from './_base/business-entity-field.entity';
import { BusinessEntityFieldController as BusinessEntityFieldControllerBase } from './_base/business-entity-field.controller';

import { BusinessEntityFieldService } from './business-entity-field.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/business-entity-fields')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('business-entity-fields')
export class BusinessEntityFieldController extends BusinessEntityFieldControllerBase {
    logger = new Logger('BusinessEntityFieldController');

    constructor(protected readonly authService: AuthService, protected readonly businessEntityFieldService: BusinessEntityFieldService) {
        super(authService, businessEntityFieldService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: BusinessEntityField,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.businessEntityFieldService.findById('1');
    }
}
