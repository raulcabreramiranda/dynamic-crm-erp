import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import ExamsMasterKnowledgeArea from './exams-master-knowledge-area.entity';

import { ExamsMasterKnowledgeAreaService } from '../exams-master-knowledge-area.service';
import { PageRequest, Page } from '../../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../../security';
import { HeaderUtil } from '../../../client/header-util';
import { LoggingInterceptor } from '../../../client/interceptors/logging.interceptor';
import { UserRepository } from '../../../repository/user.repository';
import { AuthService } from '../../../service/auth.service';

@Controller('api/exams-master-knowledge-areas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('exams-master-knowledge-areas')
export class ExamsMasterKnowledgeAreaController {
    logger = new Logger('ExamsMasterKnowledgeAreaController');

    constructor(protected readonly authService: AuthService, protected readonly examsMasterKnowledgeAreaService: ExamsMasterKnowledgeAreaService, protected readonly userRepository: UserRepository) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ExamsMasterKnowledgeArea,
    })
    async getAll(@Req() req: Request): Promise<ExamsMasterKnowledgeArea[]> {
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
            const [results, count] = await this.examsMasterKnowledgeAreaService.findAndCount(
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
        type: ExamsMasterKnowledgeArea,
    })
    async getOne(@Param('id') id: string, @Req() req: Request): Promise<ExamsMasterKnowledgeArea> {
        const selectFields = req.header('Select-Fields');
        const selectColumns = req.header('Select-Columns');

        let userAccountData = 'false';
        // if(req.header('Get-User-Account') === "1")
        //   userAccountData = JSON.stringify(await this.authService.findUserWithAuthById(req['user']['id']))
        HeaderUtil.addGlobalHeaders(req.res, userAccountData);

        try {
            return await this.examsMasterKnowledgeAreaService.findById(id, selectFields ? selectFields.split(',').map((v) => v.trim()) : [], selectColumns);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @PostMethod('/')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Create examsMasterKnowledgeArea' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ExamsMasterKnowledgeArea,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() examsMasterKnowledgeArea: ExamsMasterKnowledgeArea): Promise<ExamsMasterKnowledgeArea> {
        try {
            if (req['user']['whiteLabel']) {
                examsMasterKnowledgeArea.whiteLabel = req['user']['whiteLabel'];
            }
            examsMasterKnowledgeArea.createdDate = new Date();
            examsMasterKnowledgeArea.lastModifiedDate = new Date();
            examsMasterKnowledgeArea.createdBy = req['user']['id'];
            examsMasterKnowledgeArea.lastModifiedBy = req['user']['id'];
            const created = await this.examsMasterKnowledgeAreaService.save(examsMasterKnowledgeArea);
            HeaderUtil.addEntityCreatedHeaders(req.res, 'ExamsMasterKnowledgeArea', created.id);
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
    @ApiOperation({ description: 'Update examsMasterKnowledgeArea' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ExamsMasterKnowledgeArea,
    })
    async put(@Req() req: Request, @Body() examsMasterKnowledgeArea: ExamsMasterKnowledgeArea): Promise<ExamsMasterKnowledgeArea> {
        try {
            if (req['user']['whiteLabel']) {
                examsMasterKnowledgeArea.whiteLabel = req['user']['whiteLabel'];
            }
            examsMasterKnowledgeArea.lastModifiedDate = new Date();
            examsMasterKnowledgeArea.lastModifiedBy = req['user']['id'];

            HeaderUtil.addEntityCreatedHeaders(req.res, 'ExamsMasterKnowledgeArea', examsMasterKnowledgeArea.id);

            return await this.examsMasterKnowledgeAreaService.update(examsMasterKnowledgeArea);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }

    @Delete('/:id')
    @Roles(RoleType.USER)
    @ApiOperation({ description: 'Delete examsMasterKnowledgeArea' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Req() req: Request, @Param('id') id: string): Promise<ExamsMasterKnowledgeArea> {
        try {
            HeaderUtil.addEntityDeletedHeaders(req.res, 'ExamsMasterKnowledgeArea', id);
            const toDelete = await this.examsMasterKnowledgeAreaService.findById(id);
            return await this.examsMasterKnowledgeAreaService.delete(toDelete);
        } catch (error) {
            console.error('Error');
            console.error(error);
            req.res.status(500);
            return error;
        }
    }
}
