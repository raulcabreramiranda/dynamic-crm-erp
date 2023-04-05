import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminPermission from './admin-permission.entity';

import { AdminPermissionService } from '../admin-permission.service';
import { PageRequest, Page } from 'src/domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-permissions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-permissions')
export class AdminPermissionController {
    logger = new Logger('AdminPermissionController');

    constructor(protected readonly authService: AuthService, protected readonly adminPermissionService: AdminPermissionService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AdminPermission,
    })
    async getAll(@Req() req: Request): Promise<AdminPermission[]> {
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
            const [results, count] = await this.adminPermissionService.findAndCount(
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
        type: AdminPermission,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<AdminPermission> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.adminPermissionService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create adminPermission' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AdminPermission,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() adminPermission: AdminPermission): Promise<AdminPermission> {
        try {
            adminPermission.createdDate = new Date();
            adminPermission.lastModifiedDate = new Date();
            adminPermission.createdBy = req['user']['id'];
            adminPermission.lastModifiedBy = req['user']['id'];
            const created = await this.adminPermissionService.save(adminPermission);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminPermission', created.id);
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
    @ApiOperation({ description: 'Update adminPermission' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AdminPermission,
    })
    async put(@Req() req: Request, @Body() adminPermission: AdminPermission): Promise<AdminPermission> {
        try {
            adminPermission.lastModifiedDate = new Date();
            adminPermission.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminPermission', adminPermission.id);

            return await this.adminPermissionService.update(adminPermission);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete adminPermission' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<AdminPermission> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'AdminPermission', id);
            const toDelete = await this.adminPermissionService.findById(id);
            return await this.adminPermissionService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
