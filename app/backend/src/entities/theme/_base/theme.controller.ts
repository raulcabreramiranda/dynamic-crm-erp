import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Theme from './theme.entity';

import { ThemeService } from '../theme.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/themes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('themes')
export class ThemeController {
    logger = new Logger('ThemeController');

    constructor(protected readonly authService: AuthService, protected readonly themeService: ThemeService, protected readonly userRepository: UserRepository) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: Theme,
    })
    async getAll(@Req() req: Request): Promise<Theme[]> {
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
            const [results, count] = await this.themeService.findAndCount(
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
        type: Theme,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<Theme> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.themeService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create theme' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: Theme,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() theme: Theme): Promise<Theme> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const proposalImagemBase64 = req.body.proposalImagemBase64;
            if (proposalImagemBase64) {
                const proposalImagemFileName = req.body.proposalImagemFileName;
                const proposalImagemBDName = 'arquivos/themes/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(proposalImagemFileName)[1];
                theme.proposalImagem = '/' + proposalImagemBDName;
                await fs.mkdir('arquivos/themes/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(proposalImagemBDName, proposalImagemBase64.substring(proposalImagemBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            if (req['user']['whiteLabel']) {
                theme.whiteLabel = req['user']['whiteLabel'];
            }
            theme.createdDate = new Date();
            theme.lastModifiedDate = new Date();
            theme.createdBy = req['user']['id'];
            theme.lastModifiedBy = req['user']['id'];
            const created = await this.themeService.save(theme);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'Theme', created.id);
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
    @ApiOperation({ description: 'Update theme' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: Theme,
    })
    async put(@Req() req: Request, @Body() theme: Theme): Promise<Theme> {
        try {
            if (req['user']['whiteLabel']) {
                theme.whiteLabel = req['user']['whiteLabel'];
            }
            theme.lastModifiedDate = new Date();
            theme.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'Theme', theme.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const proposalImagemOldName = theme.proposalImagem;
            const proposalImagemBase64 = req.body.proposalImagemBase64;
            if (proposalImagemBase64) {
                const proposalImagemFileName = req.body.proposalImagemFileName;
                const proposalImagemBDName = 'arquivos/themes/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(proposalImagemFileName)[1];
                theme.proposalImagem = '/' + proposalImagemBDName;
                await fs.mkdir('arquivos/themes/', { recursive: true }, (err) => {
                    try {
                        if (err) console.log(err);
                        else if (proposalImagemOldName) {
                            fs.stat(proposalImagemOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
                                console.log(stats); //here we got all information of file in stats variable
                                if (err) return console.log(err);
                                fs.unlink(proposalImagemOldName.replace(/^\/+|\/+$/g, ''), function (err) {
                                    if (err) return console.error(err);
                                    console.log('file deleted successfully');
                                });
                            });
                        }
                        require('fs').writeFile(proposalImagemBDName, proposalImagemBase64.substring(proposalImagemBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    } catch (error) {
                        console.info(error);
                    }
                });
            }

            return await this.themeService.update(theme);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete theme' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<Theme> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'Theme', id);
            const toDelete = await this.themeService.findById(id);
            return await this.themeService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
