/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamsMasterKnowledgeAreaDTO } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.dto';
import { DisciplineDTO } from '../../discipline/_base/discipline.dto';

/**
 * A KnowledgeArea DTO object.
 */
export class KnowledgeAreaDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'sigla field', required: false })
    sigla: string;

    @ApiProperty({ type: ExamsMasterKnowledgeAreaDTO, isArray: true, description: 'examsMasterKnowledgeArea relationship' })
    examsMasterKnowledgeArea: ExamsMasterKnowledgeAreaDTO[];

    @ApiProperty({ type: DisciplineDTO, isArray: true, description: 'disciplines relationship' })
    disciplines: DisciplineDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
