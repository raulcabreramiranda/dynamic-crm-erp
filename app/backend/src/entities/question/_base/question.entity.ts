/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionLevels } from '../../question-levels/_base/question-levels.entity';
import { ExamTemplate } from '../../exam-template/_base/exam-template.entity';
import { QuestionAlternative } from '../../question-alternative/_base/question-alternative.entity';
import { QuestionText } from '../../question-text/_base/question-text.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['Question'] ?? 'Question')
export class Question extends BaseEntity {
    static columnsMetaData() {
        return {
            deletedAt: Date,
            numberAlternatives: Number,
            sourceId: Number,
            year: Number,
            originalNumber: Number,
            createDate: Date,
            languageOptionId: Boolean,
            authorId: Number,
            annulled: Boolean,
            alternativeCorrect: Number,
            externalCode: Number,
            enunciationText: String,
            enunciationImage: String,
            resolutionText: String,
            resolutionImage: String,
            justification: String,
            internalCode: String,
            version: String,
            difficulty: Number,
            discrimination: Number,
            pseudoguessing: Number,
            evolucionalquestionid: Number,
            rtfLinkResolucao: String,
            rtfLinkEnunciation: String,
            questionLevels: QuestionLevels,
            examTemplate: ExamTemplate,
            questionAlternative: QuestionAlternative,
            questionText: QuestionText,
        };
    }

    @Column({ name: 'deletedAt', type: 'datetime', nullable: true })
    @ApiProperty({ required: false })
    deletedAt?: Date;

    @Column({ type: 'integer', name: 'numberAlternatives', nullable: true })
    @ApiProperty({ required: false })
    numberAlternatives: number;

    @Column({ type: 'integer', name: 'sourceId', nullable: true })
    @ApiProperty({ required: false })
    sourceId: number;

    @Column({ type: 'integer', name: 'year', nullable: true })
    @ApiProperty({ required: false })
    year: number;

    @Column({ type: 'integer', name: 'originalNumber', nullable: true })
    @ApiProperty({ required: false })
    originalNumber: number;

    @Column({ type: 'datetime', name: 'createDate', nullable: true })
    @ApiProperty({ required: false })
    createDate: Date;

    @Column({ name: 'languageOptionId', nullable: true })
    @ApiProperty({ required: false })
    languageOptionId: boolean;

    @Column({ type: 'integer', name: 'authorId', nullable: true })
    @ApiProperty({ required: false })
    authorId: number;

    @Column({ name: 'annulled', nullable: true })
    @ApiProperty({ required: false })
    annulled: boolean;

    @Column({ type: 'integer', name: 'alternativeCorrect', nullable: true })
    @ApiProperty({ required: false })
    alternativeCorrect: number;

    @Column({ type: 'integer', name: 'externalCode', nullable: true })
    @ApiProperty({ required: false })
    externalCode: number;

    @Column({ type: 'text', name: 'enunciationText', nullable: true })
    @ApiProperty({ required: false })
    enunciationText: string;

    @Column({ name: 'enunciationImage', nullable: true })
    @ApiProperty({ required: false })
    enunciationImage: string;

    @Column({ type: 'text', name: 'resolutionText', nullable: true })
    @ApiProperty({ required: false })
    resolutionText: string;

    @Column({ name: 'resolutionImage', nullable: true })
    @ApiProperty({ required: false })
    resolutionImage: string;

    @Column({ type: 'text', name: 'justification', nullable: true })
    @ApiProperty({ required: false })
    justification: string;

    @Column({ name: 'internalCode', nullable: true })
    @ApiProperty({ required: false })
    internalCode: string;

    @Column({ name: 'version', nullable: true })
    @ApiProperty({ required: false })
    version: string;

    @Column({ type: 'float', name: 'difficulty', nullable: true })
    @ApiProperty({ required: false })
    difficulty: number;

    @Column({ type: 'float', name: 'discrimination', nullable: true })
    @ApiProperty({ required: false })
    discrimination: number;

    @Column({ type: 'float', name: 'pseudoguessing', nullable: true })
    @ApiProperty({ required: false })
    pseudoguessing: number;

    @Column({ type: 'integer', name: 'evolucionalquestionid', nullable: true })
    @ApiProperty({ required: false })
    evolucionalquestionid: number;

    @Column({ name: 'rtfLinkResolucao', nullable: true })
    @ApiProperty({ required: false })
    rtfLinkResolucao: string;

    @Column({ name: 'rtfLinkEnunciation', nullable: true })
    @ApiProperty({ required: false })
    rtfLinkEnunciation: string;

    @OneToMany(() => QuestionLevels, (other) => other.question)
    questionLevels: QuestionLevels[];

    @OneToMany(() => ExamTemplate, (other) => other.bankQuestion)
    examTemplate: ExamTemplate[];

    @OneToMany(() => QuestionAlternative, (other) => other.question)
    questionAlternative: QuestionAlternative[];

    @OneToMany(() => QuestionText, (other) => other.question)
    questionText: QuestionText[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default Question;
