import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import SkillItem from './_base/skill-item.entity';
import { SkillItemController as SkillItemControllerBase } from './_base/skill-item.controller';

import { SkillItemService } from './skill-item.service';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../repository/user.repository';
import { AuthService } from '../../service/auth.service';

@Controller('api/skill-items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('skill-items')
export class SkillItemController extends SkillItemControllerBase {
    logger = new Logger('SkillItemController');

    constructor(protected readonly authService: AuthService, protected readonly skillItemService: SkillItemService, protected readonly userRepository: UserRepository) {
        super(authService, skillItemService, userRepository);
    }

    @Get('/dummy')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'Dummy extended endpoint',
        type: SkillItem,
    })
    @ApiExcludeEndpoint()
    async getDummy() {
        return await this.skillItemService.findById('1');
    }
}
