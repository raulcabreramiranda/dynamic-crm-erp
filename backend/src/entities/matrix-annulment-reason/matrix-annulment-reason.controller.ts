import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import MatrixAnnulmentReason from './_base/matrix-annulment-reason.entity';
import { MatrixAnnulmentReasonController as MatrixAnnulmentReasonControllerBase } from './_base/matrix-annulment-reason.controller';

import { MatrixAnnulmentReasonService } from './matrix-annulment-reason.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/matrix-annulment-reasons')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('matrix-annulment-reasons')
export class MatrixAnnulmentReasonController extends MatrixAnnulmentReasonControllerBase {
    logger = new Logger('MatrixAnnulmentReasonController');

    constructor(protected readonly authService: AuthService, protected readonly matrixAnnulmentReasonService: MatrixAnnulmentReasonService, protected readonly userRepository: UserRepository) {
        super(authService, matrixAnnulmentReasonService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: MatrixAnnulmentReason,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.matrixAnnulmentReasonService.findById('1');
    }
}
