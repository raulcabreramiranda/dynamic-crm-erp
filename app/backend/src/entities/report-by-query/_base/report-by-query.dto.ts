/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ReportSubqueryDTO } from '../../report-subquery/_base/report-subquery.dto';
import { ReportCategoryDTO } from '../../report-category/_base/report-category.dto';

/**
 * A ReportByQuery DTO object.
 */
export class ReportByQueryDTO extends BaseDTO {
    @ApiProperty({ description: 'title field', required: false })
    title: string;

    @ApiProperty({ description: 'queryDescription field', required: false })
    queryDescription: string;

    @ApiProperty({ description: 'public field', required: false })
    public: boolean;

    @ApiProperty({ description: 'icon field', required: false })
    icon: string;

    @ApiProperty({ description: 'status field', required: false })
    status: string;

    @ApiProperty({ type: ReportSubqueryDTO, isArray: true, description: 'reportSubquery relationship' })
    reportSubquery: ReportSubqueryDTO[];

    @ApiProperty({ type: ReportCategoryDTO, description: 'reportCategory relationship' })
    reportCategory: ReportCategoryDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
