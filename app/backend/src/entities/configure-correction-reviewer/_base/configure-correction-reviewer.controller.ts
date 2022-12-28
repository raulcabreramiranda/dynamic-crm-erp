import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ConfigureCorrectionReviewer from './configure-correction-reviewer.entity';

import { ConfigureCorrectionReviewerService } from '../configure-correction-reviewer.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/configure-correction-reviewers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('configure-correction-reviewers')
export class ConfigureCorrectionReviewerController {
    logger = new Logger('ConfigureCorrectionReviewerController');

    constructor(
        protected readonly authService: AuthService,
        protected readonly configureCorrectionReviewerService: ConfigureCorrectionReviewerService,
        protected readonly userRepository: UserRepository,
    ) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ConfigureCorrectionReviewer,
    })
    async getAll(@Req() req: Request): Promise<ConfigureCorrectionReviewer[]> {
        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //  userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
            let filters = [];
            /* let onlyWhiteLabel = false; */
            for (var param in req.query) {
                if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
                    let column = param
                        .split('.')
                        .slice(0, param.split('.').length - 1)
                        .join('.');
                    let operation = param.split('.').length > 1 ? param.split('.').slice(-1)[0] : 'equals';
                    filters.push({ column, value: req.query[param], operation });
                    /*   if(req['user']['authorities'].indexOf('ROLE_ADMIN') !== -1 && column === "showAllWhiteLabel" && req.query[param] === "true") onlyWhiteLabel = true; */
                }
            }

            /*
      if(!onlyWhiteLabel && req['user']['whiteLabel']) {
        filters.push({
          column: 'whiteLabel',
          operation: 'equals',
          value: req['user']['whiteLabel']
        });
      } else {
      } 
      */

            const selectFields = req.header('Select-Fields');
            const selectColumns = req.header('Select-Columns');
            const [results, count] = await this.configureCorrectionReviewerService.findAndCount(
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
        type: ConfigureCorrectionReviewer,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<ConfigureCorrectionReviewer> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.configureCorrectionReviewerService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create configureCorrectionReviewer' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ConfigureCorrectionReviewer,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() configureCorrectionReviewer: ConfigureCorrectionReviewer): Promise<ConfigureCorrectionReviewer> {
        try {
            if (req['user']['whiteLabel']) {
                configureCorrectionReviewer.whiteLabel = req['user']['whiteLabel'];
            }
            configureCorrectionReviewer.createdDate = new Date();
            configureCorrectionReviewer.lastModifiedDate = new Date();
            configureCorrectionReviewer.createdBy = req['user']['id'];
            configureCorrectionReviewer.lastModifiedBy = req['user']['id'];
            const created = await this.configureCorrectionReviewerService.save(configureCorrectionReviewer);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'ConfigureCorrectionReviewer', created.id);
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
    @ApiOperation({ description: 'Update configureCorrectionReviewer' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ConfigureCorrectionReviewer,
    })
    async put(@Req() req: Request, @Body() configureCorrectionReviewer: ConfigureCorrectionReviewer): Promise<ConfigureCorrectionReviewer> {
        try {
            if (req['user']['whiteLabel']) {
                configureCorrectionReviewer.whiteLabel = req['user']['whiteLabel'];
            }
            configureCorrectionReviewer.lastModifiedDate = new Date();
            configureCorrectionReviewer.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'ConfigureCorrectionReviewer', configureCorrectionReviewer.id);

            return await this.configureCorrectionReviewerService.update(configureCorrectionReviewer);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete configureCorrectionReviewer' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<ConfigureCorrectionReviewer> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'ConfigureCorrectionReviewer', id);
            const toDelete = await this.configureCorrectionReviewerService.findById(id);
            return await this.configureCorrectionReviewerService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
