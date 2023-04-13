import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Company from './_base/company.entity';
import { CompanyController as CompanyControllerBase } from './_base/company.controller';

import { CompanyService } from './company.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/companies')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('companies')
export class CompanyController extends CompanyControllerBase {
    logger = new Logger('CompanyController');

    constructor(protected readonly authService: AuthService, protected readonly companyService: CompanyService) {
        super(authService, companyService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Company,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.companyService.findById('1');
    }
}
