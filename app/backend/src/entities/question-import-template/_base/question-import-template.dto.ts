/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AnswerOptionsType } from './answer-options-type.enum';
import { AnswerOptionsSeparator } from './answer-options-separator.enum';
import { QuestionNumberPosition } from './question-number-position.enum';
import { SourceEnpoint } from './source-enpoint.enum';

/**
 * A QuestionImportTemplate DTO object.
 */
export class QuestionImportTemplateDTO extends BaseDTO {
    @ApiProperty({ description: 'justificationCursive field', required: false })
    justificationCursive: boolean;

    @ApiProperty({ description: 'justificationBold field', required: false })
    justificationBold: boolean;

    @ApiProperty({ description: 'justificationInsensitive field', required: false })
    justificationInsensitive: boolean;

    @ApiProperty({ description: 'justificationText field', required: false })
    justificationText: string;

    @ApiProperty({ description: 'resolutionCorrectAnswerMark field', required: false })
    resolutionCorrectAnswerMark: string;

    @ApiProperty({ description: 'resolutionCursive field', required: false })
    resolutionCursive: boolean;

    @ApiProperty({ description: 'resolutionBold field', required: false })
    resolutionBold: boolean;

    @ApiProperty({ description: 'resolutionInsensitive field', required: false })
    resolutionInsensitive: boolean;

    @ApiProperty({ description: 'resolutionText field', required: false })
    resolutionText: string;

    @ApiProperty({ description: 'answerOptionsCursive field', required: false })
    answerOptionsCursive: boolean;

    @ApiProperty({ description: 'answerOptionsBold field', required: false })
    answerOptionsBold: boolean;

    @ApiProperty({ enum: AnswerOptionsType, description: 'answerOptionsType enum field', required: false })
    answerOptionsType: AnswerOptionsType;

    @ApiProperty({ enum: AnswerOptionsSeparator, description: 'answerOptionsSeparator enum field', required: false })
    answerOptionsSeparator: AnswerOptionsSeparator;

    @ApiProperty({ description: 'answerOptionsList field', required: false })
    answerOptionsList: boolean;

    @ApiProperty({ description: 'answerOptionsTable field', required: false })
    answerOptionsTable: boolean;

    @ApiProperty({ description: 'answersCursive field', required: false })
    answersCursive: boolean;

    @ApiProperty({ description: 'answersBold field', required: false })
    answersBold: boolean;

    @ApiProperty({ description: 'answersInsensitive field', required: false })
    answersInsensitive: boolean;

    @ApiProperty({ description: 'answersText field', required: false })
    answersText: string;

    @ApiProperty({ description: 'enunciadoCursive field', required: false })
    enunciadoCursive: boolean;

    @ApiProperty({ description: 'enunciadoBold field', required: false })
    enunciadoBold: boolean;

    @ApiProperty({ description: 'enunciadoInsensitive field', required: false })
    enunciadoInsensitive: boolean;

    @ApiProperty({ description: 'enunciadoText field', required: false })
    enunciadoText: string;

    @ApiProperty({ enum: QuestionNumberPosition, description: 'questionNumberPosition enum field', required: false })
    questionNumberPosition: QuestionNumberPosition;

    @ApiProperty({ description: 'questionCursiveNumber field', required: false })
    questionCursiveNumber: boolean;

    @ApiProperty({ description: 'questionCursiveText field', required: false })
    questionCursiveText: boolean;

    @ApiProperty({ description: 'questionCursiveAll field', required: false })
    questionCursiveAll: boolean;

    @ApiProperty({ description: 'questionBoldNumber field', required: false })
    questionBoldNumber: boolean;

    @ApiProperty({ description: 'questionBoldText field', required: false })
    questionBoldText: boolean;

    @ApiProperty({ description: 'questionBoldAll field', required: false })
    questionBoldAll: boolean;

    @ApiProperty({ description: 'questionInsensitive field', required: false })
    questionInsensitive: boolean;

    @ApiProperty({ description: 'questionText field', required: false })
    questionText: string;

    @ApiProperty({ description: 'templateName field', required: false })
    templateName: string;

    @ApiProperty({ enum: SourceEnpoint, description: 'sourceEnpoint enum field', required: false })
    sourceEnpoint: SourceEnpoint;

    @ApiProperty({ description: 'sourceEnpointLink field', required: false })
    sourceEnpointLink: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
