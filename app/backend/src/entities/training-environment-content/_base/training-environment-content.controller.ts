import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import TrainingEnvironmentContent from './training-environment-content.entity';

import { TrainingEnvironmentContentService } from '../training-environment-content.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/training-environment-contents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('training-environment-contents')
export class TrainingEnvironmentContentController {
    logger = new Logger('TrainingEnvironmentContentController');

    constructor(
        protected readonly authService: AuthService,
        protected readonly trainingEnvironmentContentService: TrainingEnvironmentContentService,
        protected readonly userRepository: UserRepository,
    ) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: TrainingEnvironmentContent,
    })
    async getAll(@Req() req: Request): Promise<TrainingEnvironmentContent[]> {
        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //  userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
            let filters = [];
            for (var param in req.query) {
                if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
                    let column = param
                        .split('.')
                        .slice(0, param.split('.').length - 1)
                        .join('.');
                    let operation = param.split('.').length > 1 ? param.split('.').slice(-1)[0] : 'equals';
                    filters.push({ column, value: req.query[param], operation });
                }
            }

            const selectFields = req.header('Select-Fields');
            const selectColumns = req.header('Select-Columns');
            const [results, count] = await this.trainingEnvironmentContentService.findAndCount(
                {
                    skip: +pageRequest.page * pageRequest.size,
                    take: +pageRequest.size,
                    order: pageRequest.sort.asOrder(selectFields),
                },
                filters,
                selectFields ? selectFields.split(',').map((v) => v.trim()) : [],
                selectColumns,
            );
            HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
            return results;
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: TrainingEnvironmentContent,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<TrainingEnvironmentContent> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.trainingEnvironmentContentService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create trainingEnvironmentContent' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: TrainingEnvironmentContent,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() trainingEnvironmentContent: TrainingEnvironmentContent): Promise<TrainingEnvironmentContent> {
        try {
            const created = await this.trainingEnvironmentContentService.save(trainingEnvironmentContent);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'TrainingEnvironmentContent', created.id);
            return created;
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Put('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Update trainingEnvironmentContent' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TrainingEnvironmentContent,
    })
    async put(@Req() req: Request, @Body() trainingEnvironmentContent: TrainingEnvironmentContent): Promise<TrainingEnvironmentContent> {
        try {
            HeaderUtil.addEntityCreatedHeaders(req.res, 'TrainingEnvironmentContent', trainingEnvironmentContent.id);

            return await this.trainingEnvironmentContentService.update(trainingEnvironmentContent);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete trainingEnvironmentContent' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<TrainingEnvironmentContent> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'TrainingEnvironmentContent', id);
            const toDelete = await this.trainingEnvironmentContentService.findById(id);
            return await this.trainingEnvironmentContentService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}