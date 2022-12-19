/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';
import { DisciplineDTO } from '../../discipline/_base/discipline.dto';
import { ExamsMasterKnowledgeAreaDTO } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.dto';
import { Type } from '../../../entities/master-teacher/_base/type.enum';

/**
 * A MasterTeacher DTO object.
 */
export class MasterTeacherDTO extends BaseDTO {
    @ApiProperty({ description: 'finished field', required: false })
    finished: boolean;

    @ApiProperty({ description: 'finishedReview field', required: false })
    finishedReview: boolean;

    @ApiProperty({ enum: Type, description: 'type enum field', required: false })
    type: Type;

    @ApiProperty({ type: AdminUserDTO, description: 'teacher relationship' })
    teacher: AdminUserDTO;

    @ApiProperty({ type: DisciplineDTO, description: 'discipline relationship' })
    discipline: DisciplineDTO;

    @ApiProperty({ type: ExamsMasterKnowledgeAreaDTO, description: 'examsMasterKnowledgeArea relationship' })
    examsMasterKnowledgeArea: ExamsMasterKnowledgeAreaDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
