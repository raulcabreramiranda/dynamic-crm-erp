import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Patient from './_base/patient.entity';
import { PatientController as PatientControllerBase } from './_base/patient.controller';

import { PatientService } from './patient.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/patients')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('patients')
export class PatientController extends PatientControllerBase {
    logger = new Logger('PatientController');

    constructor(protected readonly authService: AuthService, protected readonly patientService: PatientService) {
        super(authService, patientService);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Patient,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.patientService.findById('1');
    }
}
