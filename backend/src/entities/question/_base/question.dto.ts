/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionLevelsDTO } from '../../question-levels/_base/question-levels.dto';
import { ExamTemplateDTO } from '../../exam-template/_base/exam-template.dto';
import { QuestionAlternativeDTO } from '../../question-alternative/_base/question-alternative.dto';
import { QuestionTextDTO } from '../../question-text/_base/question-text.dto';

/**
 * A Question DTO object.
 */
export class QuestionDTO extends BaseDTO {
    @ApiProperty({ description: 'numberAlternatives field', required: false })
    numberAlternatives: number;

    @ApiProperty({ description: 'sourceId field', required: false })
    sourceId: number;

    @ApiProperty({ description: 'year field', required: false })
    year: number;

    @ApiProperty({ description: 'originalNumber field', required: false })
    originalNumber: number;

    @ApiProperty({ description: 'createDate field', required: false })
    createDate: Date;

    @ApiProperty({ description: 'languageOptionId field', required: false })
    languageOptionId: boolean;

    @ApiProperty({ description: 'authorId field', required: false })
    authorId: number;

    @ApiProperty({ description: 'annulled field', required: false })
    annulled: boolean;

    @ApiProperty({ description: 'alternativeCorrect field', required: false })
    alternativeCorrect: number;

    @ApiProperty({ description: 'externalCode field', required: false })
    externalCode: number;

    @ApiProperty({ description: 'enunciationText field', required: false })
    enunciationText: string;

    @ApiProperty({ description: 'enunciationImage field', required: false })
    enunciationImage: string;

    @ApiProperty({ description: 'resolutionText field', required: false })
    resolutionText: string;

    @ApiProperty({ description: 'resolutionImage field', required: false })
    resolutionImage: string;

    @ApiProperty({ description: 'justification field', required: false })
    justification: string;

    @ApiProperty({ description: 'internalCode field', required: false })
    internalCode: string;

    @ApiProperty({ description: 'version field', required: false })
    version: string;

    @ApiProperty({ description: 'difficulty field', required: false })
    difficulty: number;

    @ApiProperty({ description: 'discrimination field', required: false })
    discrimination: number;

    @ApiProperty({ description: 'pseudoguessing field', required: false })
    pseudoguessing: number;

    @ApiProperty({ description: 'evolucionalquestionid field', required: false })
    evolucionalquestionid: number;

    @ApiProperty({ description: 'rtfLinkResolucao field', required: false })
    rtfLinkResolucao: string;

    @ApiProperty({ description: 'rtfLinkEnunciation field', required: false })
    rtfLinkEnunciation: string;

    @ApiProperty({ type: QuestionLevelsDTO, isArray: true, description: 'questionLevels relationship' })
    questionLevels: QuestionLevelsDTO[];

    @ApiProperty({ type: ExamTemplateDTO, isArray: true, description: 'examTemplate relationship' })
    examTemplate: ExamTemplateDTO[];

    @ApiProperty({ type: QuestionAlternativeDTO, isArray: true, description: 'questionAlternative relationship' })
    questionAlternative: QuestionAlternativeDTO[];

    @ApiProperty({ type: QuestionTextDTO, isArray: true, description: 'questionText relationship' })
    questionText: QuestionTextDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
