/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamsMasterKnowledgeAreaDTO } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.dto';
import { MasterDTO } from '../../master/_base/master.dto';
import { ExamDTO } from '../../exam/_base/exam.dto';

/**
 * A ExamsMaster DTO object.
 */
export class ExamsMasterDTO extends BaseDTO {
    @ApiProperty({ description: 'year field', required: false })
    year: number;

    @ApiProperty({ description: 'status field', required: false })
    status: string;

    @ApiProperty({ description: 'cardPrinted field', required: false })
    cardPrinted: boolean;

    @ApiProperty({ type: ExamsMasterKnowledgeAreaDTO, isArray: true, description: 'examsMasterKnowledgeArea relationship' })
    examsMasterKnowledgeArea: ExamsMasterKnowledgeAreaDTO[];

    @ApiProperty({ type: MasterDTO, description: 'master relationship' })
    master: MasterDTO;

    @ApiProperty({ type: ExamDTO, description: 'exam relationship' })
    exam: ExamDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
