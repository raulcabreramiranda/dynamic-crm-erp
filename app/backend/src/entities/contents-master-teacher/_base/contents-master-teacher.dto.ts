/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionLevel3DTO } from '../../question-level3/_base/question-level3.dto';
import { ExamsMasterKnowledgeAreaDTO } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.dto';

/**
 * A ContentsMasterTeacher DTO object.
 */
export class ContentsMasterTeacherDTO extends BaseDTO {
    @ApiProperty({ description: 'active field', required: false })
    active: boolean;

    @ApiProperty({ type: QuestionLevel3DTO, description: 'subContent relationship' })
    subContent: QuestionLevel3DTO;

    @ApiProperty({ type: ExamsMasterKnowledgeAreaDTO, description: 'examsMasterKnowledgeArea relationship' })
    examsMasterKnowledgeArea: ExamsMasterKnowledgeAreaDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
