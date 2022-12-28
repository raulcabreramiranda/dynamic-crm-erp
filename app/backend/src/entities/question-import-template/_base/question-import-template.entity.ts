/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AnswerOptionsType } from './answer-options-type.enum';
import { AnswerOptionsSeparator } from './answer-options-separator.enum';
import { QuestionNumberPosition } from './question-number-position.enum';
import { SourceEnpoint } from './source-enpoint.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionImportTemplate'] ?? 'QuestionImportTemplate')
export class QuestionImportTemplate extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            justificationCursive: Boolean,
            justificationBold: Boolean,
            justificationInsensitive: Boolean,
            justificationText: String,
            resolutionCorrectAnswerMark: String,
            resolutionCursive: Boolean,
            resolutionBold: Boolean,
            resolutionInsensitive: Boolean,
            resolutionText: String,
            answerOptionsCursive: Boolean,
            answerOptionsBold: Boolean,
            answerOptionsType: AnswerOptionsType,
            answerOptionsSeparator: AnswerOptionsSeparator,
            answerOptionsList: Boolean,
            answerOptionsTable: Boolean,
            answersCursive: Boolean,
            answersBold: Boolean,
            answersInsensitive: Boolean,
            answersText: String,
            enunciadoCursive: Boolean,
            enunciadoBold: Boolean,
            enunciadoInsensitive: Boolean,
            enunciadoText: String,
            questionNumberPosition: QuestionNumberPosition,
            questionCursiveNumber: Boolean,
            questionCursiveText: Boolean,
            questionCursiveAll: Boolean,
            questionBoldNumber: Boolean,
            questionBoldText: Boolean,
            questionBoldAll: Boolean,
            questionInsensitive: Boolean,
            questionText: String,
            templateName: String,
            sourceEnpoint: SourceEnpoint,
            sourceEnpointLink: String,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'justificationCursive', nullable: true })
    @ApiProperty({ required: false })
    justificationCursive: boolean;

    @Column({ name: 'justificationBold', nullable: true })
    @ApiProperty({ required: false })
    justificationBold: boolean;

    @Column({ name: 'justificationInsensitive', nullable: true })
    @ApiProperty({ required: false })
    justificationInsensitive: boolean;

    @Column({ name: 'justificationText', nullable: true })
    @ApiProperty({ required: false })
    justificationText: string;

    @Column({ name: 'resolutionCorrectAnswerMark', nullable: true })
    @ApiProperty({ required: false })
    resolutionCorrectAnswerMark: string;

    @Column({ name: 'resolutionCursive', nullable: true })
    @ApiProperty({ required: false })
    resolutionCursive: boolean;

    @Column({ name: 'resolutionBold', nullable: true })
    @ApiProperty({ required: false })
    resolutionBold: boolean;

    @Column({ name: 'resolutionInsensitive', nullable: true })
    @ApiProperty({ required: false })
    resolutionInsensitive: boolean;

    @Column({ name: 'resolutionText', nullable: true })
    @ApiProperty({ required: false })
    resolutionText: string;

    @Column({ name: 'answerOptionsCursive', nullable: true })
    @ApiProperty({ required: false })
    answerOptionsCursive: boolean;

    @Column({ name: 'answerOptionsBold', nullable: true })
    @ApiProperty({ required: false })
    answerOptionsBold: boolean;

    @Column({ type: 'simple-enum', name: 'answerOptionsType', enum: AnswerOptionsType, nullable: true })
    @ApiProperty({ required: false })
    answerOptionsType: AnswerOptionsType;

    @Column({ type: 'simple-enum', name: 'answerOptionsSeparator', enum: AnswerOptionsSeparator, nullable: true })
    @ApiProperty({ required: false })
    answerOptionsSeparator: AnswerOptionsSeparator;

    @Column({ name: 'answerOptionsList', nullable: true })
    @ApiProperty({ required: false })
    answerOptionsList: boolean;

    @Column({ name: 'answerOptionsTable', nullable: true })
    @ApiProperty({ required: false })
    answerOptionsTable: boolean;

    @Column({ name: 'answersCursive', nullable: true })
    @ApiProperty({ required: false })
    answersCursive: boolean;

    @Column({ name: 'answersBold', nullable: true })
    @ApiProperty({ required: false })
    answersBold: boolean;

    @Column({ name: 'answersInsensitive', nullable: true })
    @ApiProperty({ required: false })
    answersInsensitive: boolean;

    @Column({ name: 'answersText', nullable: true })
    @ApiProperty({ required: false })
    answersText: string;

    @Column({ name: 'enunciadoCursive', nullable: true })
    @ApiProperty({ required: false })
    enunciadoCursive: boolean;

    @Column({ name: 'enunciadoBold', nullable: true })
    @ApiProperty({ required: false })
    enunciadoBold: boolean;

    @Column({ name: 'enunciadoInsensitive', nullable: true })
    @ApiProperty({ required: false })
    enunciadoInsensitive: boolean;

    @Column({ name: 'enunciadoText', nullable: true })
    @ApiProperty({ required: false })
    enunciadoText: string;

    @Column({ type: 'simple-enum', name: 'questionNumberPosition', enum: QuestionNumberPosition, nullable: true })
    @ApiProperty({ required: false })
    questionNumberPosition: QuestionNumberPosition;

    @Column({ name: 'questionCursiveNumber', nullable: true })
    @ApiProperty({ required: false })
    questionCursiveNumber: boolean;

    @Column({ name: 'questionCursiveText', nullable: true })
    @ApiProperty({ required: false })
    questionCursiveText: boolean;

    @Column({ name: 'questionCursiveAll', nullable: true })
    @ApiProperty({ required: false })
    questionCursiveAll: boolean;

    @Column({ name: 'questionBoldNumber', nullable: true })
    @ApiProperty({ required: false })
    questionBoldNumber: boolean;

    @Column({ name: 'questionBoldText', nullable: true })
    @ApiProperty({ required: false })
    questionBoldText: boolean;

    @Column({ name: 'questionBoldAll', nullable: true })
    @ApiProperty({ required: false })
    questionBoldAll: boolean;

    @Column({ name: 'questionInsensitive', nullable: true })
    @ApiProperty({ required: false })
    questionInsensitive: boolean;

    @Column({ name: 'questionText', nullable: true })
    @ApiProperty({ required: false })
    questionText: string;

    @Column({ name: 'templateName', nullable: true })
    @ApiProperty({ required: false })
    templateName: string;

    @Column({ type: 'simple-enum', name: 'sourceEnpoint', enum: SourceEnpoint, nullable: true })
    @ApiProperty({ required: false })
    sourceEnpoint: SourceEnpoint;

    @Column({ name: 'sourceEnpointLink', nullable: true })
    @ApiProperty({ required: false })
    sourceEnpointLink: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    @Column({ name: 'createdBy', nullable: true })
    @ApiProperty({ required: false })
    createdBy?: Number;

    @Column({ name: 'createdDate', type: 'datetime', nullable: true })
    @ApiProperty({ required: false })
    createdDate?: Date;

    @Column({ name: 'lastModifiedBy', nullable: true })
    @ApiProperty({ required: false })
    lastModifiedBy?: Number;

    @Column({ name: 'lastModifiedDate', type: 'datetime', nullable: true })
    @ApiProperty({ required: false })
    lastModifiedDate?: Date;
}

export default QuestionImportTemplate;
