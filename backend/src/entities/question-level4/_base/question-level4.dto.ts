/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionLevel3DTO } from '../../question-level3/_base/question-level3.dto';
import { QuestionLevelsDTO } from '../../question-levels/_base/question-levels.dto';
import { ExamTemplateDTO } from '../../exam-template/_base/exam-template.dto';

/**
 * A QuestionLevel4 DTO object.
 */
export class QuestionLevel4DTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'externalCode field', required: false })
    externalCode: number;

    @ApiProperty({ type: QuestionLevel3DTO, description: 'level3 relationship' })
    level3: QuestionLevel3DTO;

    @ApiProperty({ type: QuestionLevelsDTO, isArray: true, description: 'questionLevels relationship' })
    questionLevels: QuestionLevelsDTO[];

    @ApiProperty({ type: ExamTemplateDTO, isArray: true, description: 'examTemplate relationship' })
    examTemplate: ExamTemplateDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
