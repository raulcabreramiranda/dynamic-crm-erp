import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminUser from './admin-user.entity';

import { AdminUserService } from '../admin-user.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/admin-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-users')
export class AdminUserController {
    logger = new Logger('AdminUserController');

    constructor(protected readonly authService: AuthService, protected readonly adminUserService: AdminUserService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AdminUser,
    })
    async getAll(@Req() req: Request): Promise<AdminUser[]> {
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
            const [results, count] = await this.adminUserService.findAndCount(
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
        type: AdminUser,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<AdminUser> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.adminUserService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create adminUser' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AdminUser,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() adminUser: AdminUser): Promise<AdminUser> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageUrlBase64 = req.body.imageUrlBase64;
            if (imageUrlBase64) {
                const imageUrlFileName = req.body.imageUrlFileName;
                const imageUrlBDName = 'arquivos/admin-users/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageUrlFileName)[1];
                adminUser.imageUrl = '/' + imageUrlBDName;
                await fs.mkdir('arquivos/admin-users/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(imageUrlBDName, imageUrlBase64.substring(imageUrlBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            if (req['user']['whiteLabel']) {
                adminUser.whiteLabel = req['user']['whiteLabel'];
            }
            adminUser.createdDate = new Date();
            adminUser.lastModifiedDate = new Date();
            adminUser.createdBy = req['user']['id'];
            adminUser.lastModifiedBy = req['user']['id'];
            const created = await this.adminUserService.save(adminUser);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminUser', created.id);
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
    @ApiOperation({ description: 'Update adminUser' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AdminUser,
    })
    async put(@Req() req: Request, @Body() adminUser: AdminUser): Promise<AdminUser> {
        try {
            if (req['user']['whiteLabel']) {
                adminUser.whiteLabel = req['user']['whiteLabel'];
            }
            adminUser.lastModifiedDate = new Date();
            adminUser.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminUser', adminUser.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageUrlOldName = adminUser.imageUrl;
            const imageUrlBase64 = req.body.imageUrlBase64;
            if (imageUrlBase64) {
                const imageUrlFileName = req.body.imageUrlFileName;
                const imageUrlBDName = 'arquivos/admin-users/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageUrlFileName)[1];
                adminUser.imageUrl = '/' + imageUrlBDName;
                await fs.mkdir('arquivos/admin-users/', { recursive: true }, (err) => {
                    try {
                        if (err) console.log(err);
                        else if (imageUrlOldName) {
                            fs.stat(imageUrlOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
                                console.log(stats); //here we got all information of file in stats variable
                                if (err) return console.log(err);
                                fs.unlink(imageUrlOldName.replace(/^\/+|\/+$/g, ''), function (err) {
                                    if (err) return console.error(err);
                                    console.log('file deleted successfully');
                                });
                            });
                        }
                        require('fs').writeFile(imageUrlBDName, imageUrlBase64.substring(imageUrlBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    } catch (error) {
                        console.info(error);
                    }
                });
            }

            return await this.adminUserService.update(adminUser);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete adminUser' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<AdminUser> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'AdminUser', id);
            const toDelete = await this.adminUserService.findById(id);
            return await this.adminUserService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
