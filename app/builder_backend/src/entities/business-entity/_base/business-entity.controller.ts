import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import BusinessEntity from './business-entity.entity';

import { BusinessEntityService } from '../business-entity.service';
import { PageRequest, Page } from 'src/domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/business-entities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('business-entities')
export class BusinessEntityController {
    logger = new Logger('BusinessEntityController');

    constructor(protected readonly authService: AuthService, protected readonly businessEntityService: BusinessEntityService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: BusinessEntity,
    })
    async getAll(@Req() req: Request): Promise<BusinessEntity[]> {
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
            const [results, count] = await this.businessEntityService.findAndCount(
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
        type: BusinessEntity,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<BusinessEntity> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.businessEntityService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create businessEntity' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: BusinessEntity,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() businessEntity: BusinessEntity): Promise<BusinessEntity> {
        try {
            if (req['user']['whiteLabel']) {
                businessEntity.whiteLabel = req['user']['whiteLabel'];
            }
            businessEntity.createdDate = new Date();
            businessEntity.lastModifiedDate = new Date();
            businessEntity.createdBy = req['user']['id'];
            businessEntity.lastModifiedBy = req['user']['id'];
            const created = await this.businessEntityService.save(businessEntity);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'BusinessEntity', created.id);
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
    @ApiOperation({ description: 'Update businessEntity' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BusinessEntity,
    })
    async put(@Req() req: Request, @Body() businessEntity: BusinessEntity): Promise<BusinessEntity> {
        try {
            if (req['user']['whiteLabel']) {
                businessEntity.whiteLabel = req['user']['whiteLabel'];
            }
            businessEntity.lastModifiedDate = new Date();
            businessEntity.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'BusinessEntity', businessEntity.id);

            return await this.businessEntityService.update(businessEntity);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete businessEntity' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<BusinessEntity> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'BusinessEntity', id);
            const toDelete = await this.businessEntityService.findById(id);
            return await this.businessEntityService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
