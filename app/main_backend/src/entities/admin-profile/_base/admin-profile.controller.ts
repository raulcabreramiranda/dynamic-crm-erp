import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminProfile from './admin-profile.entity';

import { AdminProfileService } from '../admin-profile.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/admin-profiles')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-profiles')
export class AdminProfileController {
    logger = new Logger('AdminProfileController');

    constructor(protected readonly authService: AuthService, protected readonly adminProfileService: AdminProfileService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AdminProfile,
    })
    async getAll(@Req() req: Request): Promise<AdminProfile[]> {
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
            const [results, count] = await this.adminProfileService.findAndCount(
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
        type: AdminProfile,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<AdminProfile> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.adminProfileService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create adminProfile' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AdminProfile,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() adminProfile: AdminProfile): Promise<AdminProfile> {
        try {
            adminProfile.createdDate = new Date();
            adminProfile.lastModifiedDate = new Date();
            adminProfile.createdBy = req['user']['id'];
            adminProfile.lastModifiedBy = req['user']['id'];
            const created = await this.adminProfileService.save(adminProfile);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminProfile', created.id);
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
    @ApiOperation({ description: 'Update adminProfile' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AdminProfile,
    })
    async put(@Req() req: Request, @Body() adminProfile: AdminProfile): Promise<AdminProfile> {
        try {
            adminProfile.lastModifiedDate = new Date();
            adminProfile.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminProfile', adminProfile.id);

            return await this.adminProfileService.update(adminProfile);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete adminProfile' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<AdminProfile> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'AdminProfile', id);
            const toDelete = await this.adminProfileService.findById(id);
            return await this.adminProfileService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
