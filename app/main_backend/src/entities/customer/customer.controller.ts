import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Customer from './_base/customer.entity';
import { CustomerController as CustomerControllerBase } from './_base/customer.controller';

import { CustomerService } from './customer.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/customers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('customers')
export class CustomerController extends CustomerControllerBase {
    logger = new Logger('CustomerController');

    constructor(protected readonly authService: AuthService, protected readonly customerService: CustomerService) {
        super(authService, customerService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Customer,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.customerService.findById('1');
    }
}
