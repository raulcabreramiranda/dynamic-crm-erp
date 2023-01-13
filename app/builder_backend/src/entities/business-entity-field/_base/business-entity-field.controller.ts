import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import BusinessEntityField from './business-entity-field.entity';

import { BusinessEntityFieldService } from '../business-entity-field.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/business-entity-fields')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('business-entity-fields')
export class BusinessEntityFieldController {
    logger = new Logger('BusinessEntityFieldController');

    constructor(protected readonly authService: AuthService, protected readonly businessEntityFieldService: BusinessEntityFieldService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: BusinessEntityField,
    })
    async getAll(@Req() req: Request): Promise<BusinessEntityField[]> {
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
            const [results, count] = await this.businessEntityFieldService.findAndCount(
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
        type: BusinessEntityField,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<BusinessEntityField> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.businessEntityFieldService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create businessEntityField' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: BusinessEntityField,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() businessEntityField: BusinessEntityField): Promise<BusinessEntityField> {
        try {
            if (req['user']['whiteLabel']) {
                businessEntityField.whiteLabel = req['user']['whiteLabel'];
            }
            businessEntityField.createdDate = new Date();
            businessEntityField.lastModifiedDate = new Date();
            businessEntityField.createdBy = req['user']['id'];
            businessEntityField.lastModifiedBy = req['user']['id'];
            const created = await this.businessEntityFieldService.save(businessEntityField);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'BusinessEntityField', created.id);
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
    @ApiOperation({ description: 'Update businessEntityField' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BusinessEntityField,
    })
    async put(@Req() req: Request, @Body() businessEntityField: BusinessEntityField): Promise<BusinessEntityField> {
        try {
            if (req['user']['whiteLabel']) {
                businessEntityField.whiteLabel = req['user']['whiteLabel'];
            }
            businessEntityField.lastModifiedDate = new Date();
            businessEntityField.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'BusinessEntityField', businessEntityField.id);

            return await this.businessEntityFieldService.update(businessEntityField);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete businessEntityField' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<BusinessEntityField> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'BusinessEntityField', id);
            const toDelete = await this.businessEntityFieldService.findById(id);
            return await this.businessEntityFieldService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
