import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminAuthority from './admin-authority.entity';

import { AdminAuthorityService } from '../admin-authority.service';
import { PageRequest, Page } from 'src/domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-authorities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-authorities')
export class AdminAuthorityController {
    logger = new Logger('AdminAuthorityController');

    constructor(protected readonly authService: AuthService, protected readonly adminAuthorityService: AdminAuthorityService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AdminAuthority,
    })
    async getAll(@Req() req: Request): Promise<AdminAuthority[]> {
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
            const [results, count] = await this.adminAuthorityService.findAndCount(
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
        type: AdminAuthority,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<AdminAuthority> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.adminAuthorityService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create adminAuthority' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AdminAuthority,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() adminAuthority: AdminAuthority): Promise<AdminAuthority> {
        try {
            adminAuthority.createdDate = new Date();
            adminAuthority.lastModifiedDate = new Date();
            adminAuthority.createdBy = req['user']['id'];
            adminAuthority.lastModifiedBy = req['user']['id'];
            const created = await this.adminAuthorityService.save(adminAuthority);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminAuthority', created.id);
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
    @ApiOperation({ description: 'Update adminAuthority' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AdminAuthority,
    })
    async put(@Req() req: Request, @Body() adminAuthority: AdminAuthority): Promise<AdminAuthority> {
        try {
            adminAuthority.lastModifiedDate = new Date();
            adminAuthority.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminAuthority', adminAuthority.id);

            return await this.adminAuthorityService.update(adminAuthority);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete adminAuthority' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<AdminAuthority> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'AdminAuthority', id);
            const toDelete = await this.adminAuthorityService.findById(id);
            return await this.adminAuthorityService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
