/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { MasterTeacherDTO } from '../../master-teacher/_base/master-teacher.dto';
import { ContentsMasterTeacherDTO } from '../../contents-master-teacher/_base/contents-master-teacher.dto';
import { ExamsMasterDTO } from '../../exams-master/_base/exams-master.dto';
import { KnowledgeAreaDTO } from '../../knowledge-area/_base/knowledge-area.dto';

/**
 * A ExamsMasterKnowledgeArea DTO object.
 */
export class ExamsMasterKnowledgeAreaDTO extends BaseDTO {
    @ApiProperty({ description: 'configurationDeadline field', required: false })
    configurationDeadline: Date;

    @ApiProperty({ description: 'review field', required: false })
    review: boolean;

    @ApiProperty({ description: 'reviewDeadline field', required: false })
    reviewDeadline: Date;

    @ApiProperty({ description: 'percentageMaximum field', required: false })
    percentageMaximum: number;

    @ApiProperty({ description: 'incidence field', required: false })
    incidence: number;

    @ApiProperty({ description: 'entropy field', required: false })
    entropy: number;

    @ApiProperty({ description: 'concordance field', required: false })
    concordance: number;

    @ApiProperty({ type: MasterTeacherDTO, isArray: true, description: 'masterTeacher relationship' })
    masterTeacher: MasterTeacherDTO[];

    @ApiProperty({ type: ContentsMasterTeacherDTO, isArray: true, description: 'contentsMasterTeacher relationship' })
    contentsMasterTeacher: ContentsMasterTeacherDTO[];

    @ApiProperty({ type: ExamsMasterDTO, description: 'examsMaster relationship' })
    examsMaster: ExamsMasterDTO;

    @ApiProperty({ type: KnowledgeAreaDTO, description: 'knowledgeArea relationship' })
    knowledgeArea: KnowledgeAreaDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
