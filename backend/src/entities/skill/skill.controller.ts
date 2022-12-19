import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Skill from './_base/skill.entity';
import { SkillController as SkillControllerBase } from './_base/skill.controller';

import { SkillService } from './skill.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/skills')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('skills')
export class SkillController extends SkillControllerBase {
    logger = new Logger('SkillController');

    constructor(protected readonly authService: AuthService, protected readonly skillService: SkillService, protected readonly userRepository: UserRepository) {
        super(authService, skillService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: Skill,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.skillService.findById('1');
    }
}
