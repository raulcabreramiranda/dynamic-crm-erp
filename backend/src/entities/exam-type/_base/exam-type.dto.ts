/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamDTO } from '../../exam/_base/exam.dto';

/**
 * A ExamType DTO object.
 */
export class ExamTypeDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'orderShow field', required: false })
    orderShow: number;

    @ApiProperty({ description: 'active field', required: false })
    active: boolean;

    @ApiProperty({ type: ExamDTO, isArray: true, description: 'exam relationship' })
    exam: ExamDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
