/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamDTO } from '../../exam/_base/exam.dto';
import { KnowledgeAreaDTO } from '../../knowledge-area/_base/knowledge-area.dto';
import { MasterTeacherDTO } from '../../master-teacher/_base/master-teacher.dto';
import { CernePlataformUserDTO } from '../../cerne-plataform-user/_base/cerne-plataform-user.dto';
import { ContentsDTO } from '../../contents/_base/contents.dto';
import { ExamTemplateDTO } from '../../exam-template/_base/exam-template.dto';

/**
 * A Discipline DTO object.
 */
export class DisciplineDTO extends BaseDTO {
    @ApiProperty({ description: 'code field', required: false })
    code: string;

    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'sigla field', required: false })
    sigla: string;

    @ApiProperty({ type: ExamDTO, isArray: true, description: 'exam relationship' })
    exam: ExamDTO[];

    @ApiProperty({ type: KnowledgeAreaDTO, isArray: true, description: 'knowledgeArea relationship' })
    knowledgeArea: KnowledgeAreaDTO[];

    @ApiProperty({ type: MasterTeacherDTO, isArray: true, description: 'masterTeacher relationship' })
    masterTeacher: MasterTeacherDTO[];

    @ApiProperty({ type: CernePlataformUserDTO, isArray: true, description: 'cernePlataformUser relationship' })
    cernePlataformUser: CernePlataformUserDTO[];

    @ApiProperty({ type: ContentsDTO, isArray: true, description: 'contents relationship' })
    contents: ContentsDTO[];

    @ApiProperty({ type: ExamTemplateDTO, description: 'examTemplate relationship' })
    examTemplate: ExamTemplateDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
