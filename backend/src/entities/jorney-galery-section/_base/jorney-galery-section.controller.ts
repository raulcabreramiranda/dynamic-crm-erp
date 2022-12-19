import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import JorneyGalerySection from './jorney-galery-section.entity';

import { JorneyGalerySectionService } from '../jorney-galery-section.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/jorney-galery-sections')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('jorney-galery-sections')
export class JorneyGalerySectionController {
    logger = new Logger('JorneyGalerySectionController');

    constructor(protected readonly authService: AuthService, protected readonly jorneyGalerySectionService: JorneyGalerySectionService, protected readonly userRepository: UserRepository) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: JorneyGalerySection,
    })
    async getAll(@Req() req: Request): Promise<JorneyGalerySection[]> {
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
            const [results, count] = await this.jorneyGalerySectionService.findAndCount(
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
        type: JorneyGalerySection,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<JorneyGalerySection> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.jorneyGalerySectionService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create jorneyGalerySection' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: JorneyGalerySection,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() jorneyGalerySection: JorneyGalerySection): Promise<JorneyGalerySection> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const linkBase64 = req.body.linkBase64;
            if (linkBase64) {
                const linkFileName = req.body.linkFileName;
                const linkBDName = 'arquivos/jorney-galery-sections/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(linkFileName)[1];
                jorneyGalerySection.link = '/' + linkBDName;
                await fs.mkdir('arquivos/jorney-galery-sections/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(linkBDName, linkBase64.substring(linkBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            if (req['user']['whiteLabel']) {
                jorneyGalerySection.whiteLabel = req['user']['whiteLabel'];
            }
            jorneyGalerySection.createdDate = new Date();
            jorneyGalerySection.lastModifiedDate = new Date();
            jorneyGalerySection.createdBy = req['user']['id'];
            jorneyGalerySection.lastModifiedBy = req['user']['id'];
            const created = await this.jorneyGalerySectionService.save(jorneyGalerySection);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'JorneyGalerySection', created.id);
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
    @ApiOperation({ description: 'Update jorneyGalerySection' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: JorneyGalerySection,
    })
    async put(@Req() req: Request, @Body() jorneyGalerySection: JorneyGalerySection): Promise<JorneyGalerySection> {
        try {
            if (req['user']['whiteLabel']) {
                jorneyGalerySection.whiteLabel = req['user']['whiteLabel'];
            }
            jorneyGalerySection.lastModifiedDate = new Date();
            jorneyGalerySection.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'JorneyGalerySection', jorneyGalerySection.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const linkOldName = jorneyGalerySection.link;
            const linkBase64 = req.body.linkBase64;
            if (linkBase64) {
                const linkFileName = req.body.linkFileName;
                const linkBDName = 'arquivos/jorney-galery-sections/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(linkFileName)[1];
                jorneyGalerySection.link = '/' + linkBDName;
                await fs.mkdir('arquivos/jorney-galery-sections/', { recursive: true }, (err) => {
                    try {
                        if (err) console.log(err);
                        else if (linkOldName) {
                            fs.stat(linkOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
                                console.log(stats); //here we got all information of file in stats variable
                                if (err) return console.log(err);
                                fs.unlink(linkOldName.replace(/^\/+|\/+$/g, ''), function (err) {
                                    if (err) return console.error(err);
                                    console.log('file deleted successfully');
                                });
                            });
                        }
                        require('fs').writeFile(linkBDName, linkBase64.substring(linkBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    } catch (error) {
                        console.info(error);
                    }
                });
            }

            return await this.jorneyGalerySectionService.update(jorneyGalerySection);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete jorneyGalerySection' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<JorneyGalerySection> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'JorneyGalerySection', id);
            const toDelete = await this.jorneyGalerySectionService.findById(id);
            return await this.jorneyGalerySectionService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
