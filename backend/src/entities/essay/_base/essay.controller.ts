import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import Essay from './essay.entity';

import { EssayService } from '../essay.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/essays')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('essays')
export class EssayController {
    logger = new Logger('EssayController');

    constructor(protected readonly authService: AuthService, protected readonly essayService: EssayService, protected readonly userRepository: UserRepository) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: Essay,
    })
    async getAll(@Req() req: Request): Promise<Essay[]> {
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
            const [results, count] = await this.essayService.findAndCount(
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
        type: Essay,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<Essay> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.essayService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create essay' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: Essay,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() essay: Essay): Promise<Essay> {
        try {
            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const typedImageBase64 = req.body.typedImageBase64;
            if (typedImageBase64) {
                const typedImageFileName = req.body.typedImageFileName;
                const typedImageBDName = 'arquivos/essays/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(typedImageFileName)[1];
                essay.typedImage = '/' + typedImageBDName;
                await fs.mkdir('arquivos/essays/', { recursive: true }, (err) => {
                    if (err) console.log(err);
                    else {
                        require('fs').writeFile(typedImageBDName, typedImageBase64.substring(typedImageBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    }
                });
            }

            if (req['user']['whiteLabel']) {
                essay.whiteLabel = req['user']['whiteLabel'];
            }
            essay.createdDate = new Date();
            essay.lastModifiedDate = new Date();
            essay.createdBy = req['user']['id'];
            essay.lastModifiedBy = req['user']['id'];
            const created = await this.essayService.save(essay);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'Essay', created.id);
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
    @ApiOperation({ description: 'Update essay' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: Essay,
    })
    async put(@Req() req: Request, @Body() essay: Essay): Promise<Essay> {
        try {
            if (req['user']['whiteLabel']) {
                essay.whiteLabel = req['user']['whiteLabel'];
            }
            essay.lastModifiedDate = new Date();
            essay.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'Essay', essay.id);

            const fs = require('fs');
            const re = /(?:\.([^.]+))?$/;

            const typedImageOldName = essay.typedImage;
            const typedImageBase64 = req.body.typedImageBase64;
            if (typedImageBase64) {
                const typedImageFileName = req.body.typedImageFileName;
                const typedImageBDName = 'arquivos/essays/' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(typedImageFileName)[1];
                essay.typedImage = '/' + typedImageBDName;
                await fs.mkdir('arquivos/essays/', { recursive: true }, (err) => {
                    try {
                        if (err) console.log(err);
                        else if (typedImageOldName) {
                            fs.stat(typedImageOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
                                console.log(stats); //here we got all information of file in stats variable
                                if (err) return console.log(err);
                                fs.unlink(typedImageOldName.replace(/^\/+|\/+$/g, ''), function (err) {
                                    if (err) return console.error(err);
                                    console.log('file deleted successfully');
                                });
                            });
                        }
                        require('fs').writeFile(typedImageBDName, typedImageBase64.substring(typedImageBase64.indexOf(',') + 1), 'base64', function (err) {
                            console.log(err);
                        });
                    } catch (error) {
                        console.info(error);
                    }
                });
            }

            return await this.essayService.update(essay);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete essay' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<Essay> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'Essay', id);
            const toDelete = await this.essayService.findById(id);
            return await this.essayService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
