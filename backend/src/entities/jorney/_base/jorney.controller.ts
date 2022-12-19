import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Jorney from './jorney.entity';

import { JorneyService } from '../jorney.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/jorneys')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorneys')
export class JorneyController {
    logger = new Logger('JorneyController');

    constructor(protected readonly authService: AuthService, protected readonly jorneyService: JorneyService, protected readonly userRepository: UserRepository) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: Jorney,
    })
    async getAll(@Req() req: Request): Promise<Jorney[]> {
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
            const [results, count] = await this.jorneyService.findAndCount(
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
        type: Jorney,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<Jorney> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.jorneyService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create jorney' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: Jorney,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() jorney: Jorney): Promise<Jorney> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageBannerBase64 = req.body.imageBannerBase64;
            if (imageBannerBase64) {
                const imageBannerFileName = req.body.imageBannerFileName;
                const imageBannerBDName = 'arquivos/jorneys/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageBannerFileName)[1];
                jorney.imageBanner = '/' + imageBannerBDName;
                await fs.mkdir('arquivos/jorneys/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(imageBannerBDName, imageBannerBase64.substring(imageBannerBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            if (req['user']['whiteLabel']) {
                jorney.whiteLabel = req['user']['whiteLabel'];
            }
            jorney.createdDate = new Date();
            jorney.lastModifiedDate = new Date();
            jorney.createdBy = req['user']['id'];
            jorney.lastModifiedBy = req['user']['id'];
            const created = await this.jorneyService.save(jorney);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'Jorney', created.id);
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
    @ApiOperation({ description: 'Update jorney' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: Jorney,
    })
    async put(@Req() req: Request, @Body() jorney: Jorney): Promise<Jorney> {
        try {
            if (req['user']['whiteLabel']) {
                jorney.whiteLabel = req['user']['whiteLabel'];
            }
            jorney.lastModifiedDate = new Date();
            jorney.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'Jorney', jorney.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageBannerOldName = jorney.imageBanner;
            const imageBannerBase64 = req.body.imageBannerBase64;
            if (imageBannerBase64) {
                const imageBannerFileName = req.body.imageBannerFileName;
                const imageBannerBDName = 'arquivos/jorneys/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageBannerFileName)[1];
                jorney.imageBanner = '/' + imageBannerBDName;
                await fs.mkdir('arquivos/jorneys/', { recursive: true }, (err) => {
                    try {
                        if (err) console.log(err);
                        else if (imageBannerOldName) {
                            fs.stat(imageBannerOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
                                console.log(stats); //here we got all information of file in stats variable
                                if (err) return console.log(err);
                                fs.unlink(imageBannerOldName.replace(/^\/+|\/+$/g, ''), function (err) {
                                    if (err) return console.error(err);
                                    console.log('file deleted successfully');
                                });
                            });
                        }
                        require('fs').writeFile(imageBannerBDName, imageBannerBase64.substring(imageBannerBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    } catch (error) {
                        console.info(error);
                    }
                });
            }

            return await this.jorneyService.update(jorney);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete jorney' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<Jorney> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'Jorney', id);
            const toDelete = await this.jorneyService.findById(id);
            return await this.jorneyService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
