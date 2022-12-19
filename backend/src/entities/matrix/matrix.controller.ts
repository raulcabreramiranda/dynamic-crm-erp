import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Matrix from './_base/matrix.entity';
import { MatrixController as MatrixControllerBase } from './_base/matrix.controller';

import { MatrixService } from './matrix.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/matrices')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('matrices')
export class MatrixController extends MatrixControllerBase {
    logger = new Logger('MatrixController');

    constructor(protected readonly authService: AuthService, protected readonly matrixService: MatrixService, protected readonly userRepository: UserRepository) {
        super(authService, matrixService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Matrix,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.matrixService.findById('1');
    }
}
