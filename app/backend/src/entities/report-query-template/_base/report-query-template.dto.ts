/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ReportSubqueryDTO } from '../../report-subquery/_base/report-subquery.dto';

/**
 * A ReportQueryTemplate DTO object.
 */
export class ReportQueryTemplateDTO extends BaseDTO {
    @ApiProperty({ description: 'templateName field', required: false })
    templateName: string;

    @ApiProperty({ description: 'groupBy field', required: false })
    groupBy: string;

    @ApiProperty({ description: 'dimension field', required: false })
    dimension: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'isPublic field', required: false })
    isPublic: boolean;

    @ApiProperty({ type: ReportSubqueryDTO, description: 'reportSubquery relationship' })
    reportSubquery: ReportSubqueryDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
