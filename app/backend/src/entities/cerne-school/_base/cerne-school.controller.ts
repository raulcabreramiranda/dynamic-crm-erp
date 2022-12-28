import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import CerneSchool from './cerne-school.entity';

import { CerneSchoolService } from '../cerne-school.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/cerne-schools')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('cerne-schools')
export class CerneSchoolController {
    logger = new Logger('CerneSchoolController');

    constructor(protected readonly authService: AuthService, protected readonly cerneSchoolService: CerneSchoolService, protected readonly userRepository: UserRepository) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CerneSchool,
    })
    async getAll(@Req() req: Request): Promise<CerneSchool[]> {
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
            const [results, count] = await this.cerneSchoolService.findAndCount(
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
        type: CerneSchool,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<CerneSchool> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.cerneSchoolService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create cerneSchool' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CerneSchool,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() cerneSchool: CerneSchool): Promise<CerneSchool> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageBase64 = req.body.imageBase64;
            if (imageBase64) {
                const imageFileName = req.body.imageFileName;
                const imageBDName = 'arquivos/cerne-schools/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];
                cerneSchool.image = '/' + imageBDName;
                await fs.mkdir('arquivos/cerne-schools/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(imageBDName, imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            if (req['user']['whiteLabel']) {
                cerneSchool.whiteLabel = req['user']['whiteLabel'];
            }
            cerneSchool.createdDate = new Date();
            cerneSchool.lastModifiedDate = new Date();
            cerneSchool.createdBy = req['user']['id'];
            cerneSchool.lastModifiedBy = req['user']['id'];
            const created = await this.cerneSchoolService.save(cerneSchool);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'CerneSchool', created.id);
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
    @ApiOperation({ description: 'Update cerneSchool' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CerneSchool,
    })
    async put(@Req() req: Request, @Body() cerneSchool: CerneSchool): Promise<CerneSchool> {
        try {
            if (req['user']['whiteLabel']) {
                cerneSchool.whiteLabel = req['user']['whiteLabel'];
            }
            cerneSchool.lastModifiedDate = new Date();
            cerneSchool.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'CerneSchool', cerneSchool.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageOldName = cerneSchool.image;
            const imageBase64 = req.body.imageBase64;
            if (imageBase64) {
                const imageFileName = req.body.imageFileName;
                const imageBDName = 'arquivos/cerne-schools/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];
                cerneSchool.image = '/' + imageBDName;
                await fs.mkdir('arquivos/cerne-schools/', { recursive: true }, (err) => {
                    try {
                        if (err) console.log(err);
                        else if (imageOldName) {
                            fs.stat(imageOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
                                console.log(stats); //here we got all information of file in stats variable
                                if (err) return console.log(err);
                                fs.unlink(imageOldName.replace(/^\/+|\/+$/g, ''), function (err) {
                                    if (err) return console.error(err);
                                    console.log('file deleted successfully');
                                });
                            });
                        }
                        require('fs').writeFile(imageBDName, imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    } catch (error) {
                        console.info(error);
                    }
                });
            }

            return await this.cerneSchoolService.update(cerneSchool);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete cerneSchool' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<CerneSchool> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'CerneSchool', id);
            const toDelete = await this.cerneSchoolService.findById(id);
            return await this.cerneSchoolService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
