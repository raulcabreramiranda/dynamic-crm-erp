/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionLevel1DTO } from '../../question-level1/_base/question-level1.dto';
import { QuestionLevel3DTO } from '../../question-level3/_base/question-level3.dto';
import { QuestionLevelsDTO } from '../../question-levels/_base/question-levels.dto';
import { ExamTemplateDTO } from '../../exam-template/_base/exam-template.dto';
import { TypeSource } from '../../../entities/question-level2/_base/type-source.enum';

/**
 * A QuestionLevel2 DTO object.
 */
export class QuestionLevel2DTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'externalCode field', required: false })
    externalCode: number;

    @ApiProperty({ enum: TypeSource, description: 'typeSource enum field', required: false })
    typeSource: TypeSource;

    @ApiProperty({ type: QuestionLevel1DTO, description: 'level1 relationship' })
    level1: QuestionLevel1DTO;

    @ApiProperty({ type: QuestionLevel3DTO, isArray: true, description: 'level3 relationship' })
    level3: QuestionLevel3DTO[];

    @ApiProperty({ type: QuestionLevelsDTO, isArray: true, description: 'questionLevels relationship' })
    questionLevels: QuestionLevelsDTO[];

    @ApiProperty({ type: ExamTemplateDTO, isArray: true, description: 'examTemplate relationship' })
    examTemplate: ExamTemplateDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
