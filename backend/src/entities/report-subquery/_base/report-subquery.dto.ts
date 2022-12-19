/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ReportByQueryDTO } from '../../report-by-query/_base/report-by-query.dto';
import { ReportQueryTemplateDTO } from '../../report-query-template/_base/report-query-template.dto';
import { ReportCategoryDTO } from '../../report-category/_base/report-category.dto';

/**
 * A ReportSubquery DTO object.
 */
export class ReportSubqueryDTO extends BaseDTO {
    @ApiProperty({ description: 'queryDescription field', required: false })
    queryDescription: string;

    @ApiProperty({ description: 'title field', required: false })
    title: string;

    @ApiProperty({ type: ReportByQueryDTO, description: 'reportByQuery relationship' })
    reportByQuery: ReportByQueryDTO;

    @ApiProperty({ type: ReportQueryTemplateDTO, isArray: true, description: 'reportQueryTemplate relationship' })
    reportQueryTemplate: ReportQueryTemplateDTO[];

    @ApiProperty({ type: ReportCategoryDTO, description: 'reportCategory relationship' })
    reportCategory: ReportCategoryDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
