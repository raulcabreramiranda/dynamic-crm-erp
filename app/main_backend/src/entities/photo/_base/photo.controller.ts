import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Photo from './photo.entity';

import { PhotoService } from '../photo.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/photos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('photos')
export class PhotoController {
    logger = new Logger('PhotoController');

    constructor(protected readonly authService: AuthService, protected readonly photoService: PhotoService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: Photo,
    })
    async getAll(@Req() req: Request): Promise<Photo[]> {
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
            const [results, count] = await this.photoService.findAndCount(
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
        type: Photo,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<Photo> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.photoService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create photo' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: Photo,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() photo: Photo): Promise<Photo> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const linkBase64 = req.body.linkBase64;
            if (linkBase64) {
                const linkFileName = req.body.linkFileName;
                const linkBDName = 'arquivos/photos/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(linkFileName)[1];
                photo.link = '/' + linkBDName;
                await fs.mkdir('arquivos/photos/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(linkBDName, linkBase64.substring(linkBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            const created = await this.photoService.save(photo);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'Photo', created.id);
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
    @ApiOperation({ description: 'Update photo' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: Photo,
    })
    async put(@Req() req: Request, @Body() photo: Photo): Promise<Photo> {
        try {
            HeaderUtil.addEntityCreatedHeaders(req.res, 'Photo', photo.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const linkOldName = photo.link;
            const linkBase64 = req.body.linkBase64;
            if (linkBase64) {
                const linkFileName = req.body.linkFileName;
                const linkBDName = 'arquivos/photos/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(linkFileName)[1];
                photo.link = '/' + linkBDName;
                await fs.mkdir('arquivos/photos/', { recursive: true }, (err) => {
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

            return await this.photoService.update(photo);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete photo' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<Photo> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'Photo', id);
            const toDelete = await this.photoService.findById(id);
            return await this.photoService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
