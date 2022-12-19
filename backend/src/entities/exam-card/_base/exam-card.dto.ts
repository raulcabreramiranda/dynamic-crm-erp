/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamCardReadDTO } from '../../exam-card-read/_base/exam-card-read.dto';

/**
 * A ExamCard DTO object.
 */
export class ExamCardDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'active field', required: false })
    active: boolean;

    @ApiProperty({ description: 'templateGeneration field', required: false })
    templateGeneration: string;

    @ApiProperty({ description: 'templateReading field', required: false })
    templateReading: string;

    @ApiProperty({ description: 'templateBlank field', required: false })
    templateBlank: string;

    @ApiProperty({ description: 'phpCustom field', required: false })
    phpCustom: string;

    @ApiProperty({ description: 'phpCustomReading field', required: false })
    phpCustomReading: string;

    @ApiProperty({ type: ExamCardReadDTO, isArray: true, description: 'examCardRead relationship' })
    examCardRead: ExamCardReadDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
