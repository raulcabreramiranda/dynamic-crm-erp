import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import JorneyGalerySectionSubject from './jorney-galery-section-subject.entity';

import { JorneyGalerySectionSubjectService } from '../jorney-galery-section-subject.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/jorney-galery-section-subjects')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorney-galery-section-subjects')
export class JorneyGalerySectionSubjectController {
    logger = new Logger('JorneyGalerySectionSubjectController');

    constructor(
        protected readonly authService: AuthService,
        protected readonly jorneyGalerySectionSubjectService: JorneyGalerySectionSubjectService,
        protected readonly userRepository: UserRepository,
    ) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: JorneyGalerySectionSubject,
    })
    async getAll(@Req() req: Request): Promise<JorneyGalerySectionSubject[]> {
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
            const [results, count] = await this.jorneyGalerySectionSubjectService.findAndCount(
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
        type: JorneyGalerySectionSubject,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<JorneyGalerySectionSubject> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.jorneyGalerySectionSubjectService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create jorneyGalerySectionSubject' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: JorneyGalerySectionSubject,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() jorneyGalerySectionSubject: JorneyGalerySectionSubject): Promise<JorneyGalerySectionSubject> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageBase64 = req.body.imageBase64;
            if (imageBase64) {
                const imageFileName = req.body.imageFileName;
                const imageBDName = 'arquivos/jorney-galery-section-subjects/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];
                jorneyGalerySectionSubject.image = '/' + imageBDName;
                await fs.mkdir('arquivos/jorney-galery-section-subjects/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(imageBDName, imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            if (req['user']['whiteLabel']) {
                jorneyGalerySectionSubject.whiteLabel = req['user']['whiteLabel'];
            }
            jorneyGalerySectionSubject.createdDate = new Date();
            jorneyGalerySectionSubject.lastModifiedDate = new Date();
            jorneyGalerySectionSubject.createdBy = req['user']['id'];
            jorneyGalerySectionSubject.lastModifiedBy = req['user']['id'];
            const created = await this.jorneyGalerySectionSubjectService.save(jorneyGalerySectionSubject);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'JorneyGalerySectionSubject', created.id);
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
    @ApiOperation({ description: 'Update jorneyGalerySectionSubject' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: JorneyGalerySectionSubject,
    })
    async put(@Req() req: Request, @Body() jorneyGalerySectionSubject: JorneyGalerySectionSubject): Promise<JorneyGalerySectionSubject> {
        try {
            if (req['user']['whiteLabel']) {
                jorneyGalerySectionSubject.whiteLabel = req['user']['whiteLabel'];
            }
            jorneyGalerySectionSubject.lastModifiedDate = new Date();
            jorneyGalerySectionSubject.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'JorneyGalerySectionSubject', jorneyGalerySectionSubject.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const imageOldName = jorneyGalerySectionSubject.image;
            const imageBase64 = req.body.imageBase64;
            if (imageBase64) {
                const imageFileName = req.body.imageFileName;
                const imageBDName = 'arquivos/jorney-galery-section-subjects/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];
                jorneyGalerySectionSubject.image = '/' + imageBDName;
                await fs.mkdir('arquivos/jorney-galery-section-subjects/', { recursive: true }, (err) => {
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

            return await this.jorneyGalerySectionSubjectService.update(jorneyGalerySectionSubject);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete jorneyGalerySectionSubject' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<JorneyGalerySectionSubject> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'JorneyGalerySectionSubject', id);
            const toDelete = await this.jorneyGalerySectionSubjectService.findById(id);
            return await this.jorneyGalerySectionSubjectService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
