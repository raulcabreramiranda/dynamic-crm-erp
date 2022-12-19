import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ConfigureCorrection from './configure-correction.entity';

import { ConfigureCorrectionService } from '../configure-correction.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/configure-corrections')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('configure-corrections')
export class ConfigureCorrectionController {
    logger = new Logger('ConfigureCorrectionController');

    constructor(protected readonly authService: AuthService, protected readonly configureCorrectionService: ConfigureCorrectionService, protected readonly userRepository: UserRepository) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ConfigureCorrection,
    })
    async getAll(@Req() req: Request): Promise<ConfigureCorrection[]> {
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
            const [results, count] = await this.configureCorrectionService.findAndCount(
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
        type: ConfigureCorrection,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<ConfigureCorrection> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.configureCorrectionService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create configureCorrection' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ConfigureCorrection,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() configureCorrection: ConfigureCorrection): Promise<ConfigureCorrection> {
        try {
            if (req['user']['whiteLabel']) {
                configureCorrection.whiteLabel = req['user']['whiteLabel'];
            }
            configureCorrection.createdDate = new Date();
            configureCorrection.lastModifiedDate = new Date();
            configureCorrection.createdBy = req['user']['id'];
            configureCorrection.lastModifiedBy = req['user']['id'];
            const created = await this.configureCorrectionService.save(configureCorrection);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'ConfigureCorrection', created.id);
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
    @ApiOperation({ description: 'Update configureCorrection' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ConfigureCorrection,
    })
    async put(@Req() req: Request, @Body() configureCorrection: ConfigureCorrection): Promise<ConfigureCorrection> {
        try {
            if (req['user']['whiteLabel']) {
                configureCorrection.whiteLabel = req['user']['whiteLabel'];
            }
            configureCorrection.lastModifiedDate = new Date();
            configureCorrection.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'ConfigureCorrection', configureCorrection.id);

            return await this.configureCorrectionService.update(configureCorrection);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete configureCorrection' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<ConfigureCorrection> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'ConfigureCorrection', id);
            const toDelete = await this.configureCorrectionService.findById(id);
            return await this.configureCorrectionService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
