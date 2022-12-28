/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { StudentQuestionDTO } from '../../student-question/_base/student-question.dto';
import { QuestionLevel2DTO } from '../../question-level2/_base/question-level2.dto';
import { QuestionLevel3DTO } from '../../question-level3/_base/question-level3.dto';
import { QuestionLevel4DTO } from '../../question-level4/_base/question-level4.dto';
import { ExamDTO } from '../../exam/_base/exam.dto';
import { QuestionDTO } from '../../question/_base/question.dto';
import { DisciplineDTO } from '../../discipline/_base/discipline.dto';
import { Gabarito } from './gabarito.enum';
import { TypeQuestion } from './type-question.enum';

/**
 * A ExamTemplate DTO object.
 */
export class ExamTemplateDTO extends BaseDTO {
    @ApiProperty({ enum: Gabarito, description: 'gabarito enum field', required: false })
    gabarito: Gabarito;

    @ApiProperty({ description: 'feedbackQuestion field', required: false })
    feedbackQuestion: string;

    @ApiProperty({ enum: TypeQuestion, description: 'typeQuestion enum field', required: false })
    typeQuestion: TypeQuestion;

    @ApiProperty({ description: 'questionNumber field', required: false })
    questionNumber: number;

    @ApiProperty({ description: 'enunciationText field', required: false })
    enunciationText: string;

    @ApiProperty({ description: 'scoreQuestion field', required: false })
    scoreQuestion: number;

    @ApiProperty({ description: 'questionCanceled field', required: false })
    questionCanceled: boolean;

    @ApiProperty({ type: StudentQuestionDTO, isArray: true, description: 'studentQuestion relationship' })
    studentQuestion: StudentQuestionDTO[];

    @ApiProperty({ type: QuestionLevel2DTO, description: 'conteudoLevel2 relationship' })
    conteudoLevel2: QuestionLevel2DTO;

    @ApiProperty({ type: QuestionLevel3DTO, description: 'subConteudoLevel3 relationship' })
    subConteudoLevel3: QuestionLevel3DTO;

    @ApiProperty({ type: QuestionLevel4DTO, description: 'itemLevel4 relationship' })
    itemLevel4: QuestionLevel4DTO;

    @ApiProperty({ type: ExamDTO, description: 'exam relationship' })
    exam: ExamDTO;

    @ApiProperty({ type: QuestionDTO, description: 'bankQuestion relationship' })
    bankQuestion: QuestionDTO;

    @ApiProperty({ type: DisciplineDTO, isArray: true, description: 'discipline relationship' })
    discipline: DisciplineDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
