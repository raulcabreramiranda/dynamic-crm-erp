import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import AdminWhiteLabel from './admin-white-label.entity';

import { AdminWhiteLabelService } from '../admin-white-label.service';
import { PageRequest, Page } from 'src/domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from 'src/security';
import { HeaderUtil } from 'src/client/header-util';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/auth.service';

@Controller('api/admin-white-labels')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('admin-white-labels')
export class AdminWhiteLabelController {
    logger = new Logger('AdminWhiteLabelController');

    constructor(protected readonly authService: AuthService, protected readonly adminWhiteLabelService: AdminWhiteLabelService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AdminWhiteLabel,
    })
    async getAll(@Req() req: Request): Promise<AdminWhiteLabel[]> {
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
            const [results, count] = await this.adminWhiteLabelService.findAndCount(
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
        type: AdminWhiteLabel,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<AdminWhiteLabel> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.adminWhiteLabelService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create adminWhiteLabel' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AdminWhiteLabel,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() adminWhiteLabel: AdminWhiteLabel): Promise<AdminWhiteLabel> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const logoBase64 = req.body.logoBase64;
            if (logoBase64) {
                const logoFileName = req.body.logoFileName;
                const logoBDName = 'arquivos/admin-white-labels/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(logoFileName)[1];
                adminWhiteLabel.logo = '/' + logoBDName;
                await fs.mkdir('arquivos/admin-white-labels/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(logoBDName, logoBase64.substring(logoBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            adminWhiteLabel.createdDate = new Date();
            adminWhiteLabel.lastModifiedDate = new Date();
            adminWhiteLabel.createdBy = req['user']['id'];
            adminWhiteLabel.lastModifiedBy = req['user']['id'];
            const created = await this.adminWhiteLabelService.save(adminWhiteLabel);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminWhiteLabel', created.id);
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
    @ApiOperation({ description: 'Update adminWhiteLabel' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AdminWhiteLabel,
    })
    async put(@Req() req: Request, @Body() adminWhiteLabel: AdminWhiteLabel): Promise<AdminWhiteLabel> {
        try {
            adminWhiteLabel.lastModifiedDate = new Date();
            adminWhiteLabel.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'AdminWhiteLabel', adminWhiteLabel.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const logoOldName = adminWhiteLabel.logo;
            const logoBase64 = req.body.logoBase64;
            if (logoBase64) {
                const logoFileName = req.body.logoFileName;
                const logoBDName = 'arquivos/admin-white-labels/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(logoFileName)[1];
                adminWhiteLabel.logo = '/' + logoBDName;
                await fs.mkdir('arquivos/admin-white-labels/', { recursive: true }, (err) => {
                    try {
                        if (err) console.log(err);
                        else if (logoOldName) {
                            fs.stat(logoOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
                                console.log(stats); //here we got all information of file in stats variable
                                if (err) return console.log(err);
                                fs.unlink(logoOldName.replace(/^\/+|\/+$/g, ''), function (err) {
                                    if (err) return console.error(err);
                                    console.log('file deleted successfully');
                                });
                            });
                        }
                        require('fs').writeFile(logoBDName, logoBase64.substring(logoBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    } catch (error) {
                        console.info(error);
                    }
                });
            }

            return await this.adminWhiteLabelService.update(adminWhiteLabel);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete adminWhiteLabel' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<AdminWhiteLabel> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'AdminWhiteLabel', id);
            const toDelete = await this.adminWhiteLabelService.findById(id);
            return await this.adminWhiteLabelService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
