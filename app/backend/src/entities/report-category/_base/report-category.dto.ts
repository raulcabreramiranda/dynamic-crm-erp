/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ReportSubqueryDTO } from '../../report-subquery/_base/report-subquery.dto';
import { ReportByQueryDTO } from '../../report-by-query/_base/report-by-query.dto';

/**
 * A ReportCategory DTO object.
 */
export class ReportCategoryDTO extends BaseDTO {
    @ApiProperty({ description: 'icon field', required: false })
    icon: string;

    @ApiProperty({ description: 'title field', required: false })
    title: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'platformId field', required: false })
    platformId: number;

    @ApiProperty({ description: 'deletedBy field', required: false })
    deletedBy: string;

    @ApiProperty({ type: ReportSubqueryDTO, isArray: true, description: 'reportSubquery relationship' })
    reportSubquery: ReportSubqueryDTO[];

    @ApiProperty({ type: ReportByQueryDTO, isArray: true, description: 'reportByQuery relationship' })
    reportByQuery: ReportByQueryDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
