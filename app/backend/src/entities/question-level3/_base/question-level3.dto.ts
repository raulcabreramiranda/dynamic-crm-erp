/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ContentsMasterTeacherDTO } from '../../contents-master-teacher/_base/contents-master-teacher.dto';
import { QuestionLevel2DTO } from '../../question-level2/_base/question-level2.dto';
import { QuestionLevel4DTO } from '../../question-level4/_base/question-level4.dto';
import { QuestionLevelsDTO } from '../../question-levels/_base/question-levels.dto';
import { ExamTemplateDTO } from '../../exam-template/_base/exam-template.dto';

/**
 * A QuestionLevel3 DTO object.
 */
export class QuestionLevel3DTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'externalCode field', required: false })
    externalCode: number;

    @ApiProperty({ description: 'enemincidenceparameter field', required: false })
    enemincidenceparameter: number;

    @ApiProperty({ description: 'enemIncidencePercent field', required: false })
    enemIncidencePercent: number;

    @ApiProperty({ type: ContentsMasterTeacherDTO, isArray: true, description: 'contentsMasterTeacher relationship' })
    contentsMasterTeacher: ContentsMasterTeacherDTO[];

    @ApiProperty({ type: QuestionLevel2DTO, description: 'level2 relationship' })
    level2: QuestionLevel2DTO;

    @ApiProperty({ type: QuestionLevel4DTO, isArray: true, description: 'level4 relationship' })
    level4: QuestionLevel4DTO[];

    @ApiProperty({ type: QuestionLevelsDTO, isArray: true, description: 'questionLevels relationship' })
    questionLevels: QuestionLevelsDTO[];

    @ApiProperty({ type: ExamTemplateDTO, isArray: true, description: 'examTemplate relationship' })
    examTemplate: ExamTemplateDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
