/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { StudentQuestion } from '../../student-question/_base/student-question.entity';
import { QuestionLevel2 } from '../../question-level2/_base/question-level2.entity';
import { QuestionLevel3 } from '../../question-level3/_base/question-level3.entity';
import { QuestionLevel4 } from '../../question-level4/_base/question-level4.entity';
import { Exam } from '../../exam/_base/exam.entity';
import { Question } from '../../question/_base/question.entity';
import { Discipline } from '../../discipline/_base/discipline.entity';
import { Gabarito } from './gabarito.enum';
import { TypeQuestion } from './type-question.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['ExamTemplate'] ?? 'ExamTemplate')
export class ExamTemplate extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            gabarito: Gabarito,
            feedbackQuestion: String,
            typeQuestion: TypeQuestion,
            questionNumber: Number,
            enunciationText: String,
            scoreQuestion: Number,
            questionCanceled: Boolean,
            studentQuestion: StudentQuestion,
            conteudoLevel2: QuestionLevel2,
            subConteudoLevel3: QuestionLevel3,
            itemLevel4: QuestionLevel4,
            exam: Exam,
            bankQuestion: Question,
            discipline: Discipline,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'simple-enum', name: 'gabarito', enum: Gabarito, nullable: true })
    @ApiProperty({ required: false })
    gabarito: Gabarito;

    @Column({ type: 'text', name: 'feedbackQuestion', nullable: true })
    @ApiProperty({ required: false })
    feedbackQuestion: string;

    @Column({ type: 'simple-enum', name: 'typeQuestion', enum: TypeQuestion, nullable: true })
    @ApiProperty({ required: false })
    typeQuestion: TypeQuestion;

    @Column({ type: 'integer', name: 'questionNumber', nullable: true })
    @ApiProperty({ required: false })
    questionNumber: number;

    @Column({ type: 'text', name: 'enunciationText', nullable: true })
    @ApiProperty({ required: false })
    enunciationText: string;

    @Column({ type: 'float', name: 'scoreQuestion', nullable: true })
    @ApiProperty({ required: false })
    scoreQuestion: number;

    @Column({ name: 'questionCanceled', nullable: true })
    @ApiProperty({ required: false })
    questionCanceled: boolean;

    @OneToMany(() => StudentQuestion, (other) => other.examTemplate)
    studentQuestion: StudentQuestion[];

    @ManyToOne(() => QuestionLevel2)
    conteudoLevel2: QuestionLevel2;

    @ManyToOne(() => QuestionLevel3)
    subConteudoLevel3: QuestionLevel3;

    @ManyToOne(() => QuestionLevel4)
    itemLevel4: QuestionLevel4;

    @ManyToOne(() => Exam, (other) => other.examTemplate)
    exam: Exam;

    @ManyToOne(() => Question, (other) => other.examTemplate)
    bankQuestion: Question;

    @OneToMany(() => Discipline, (other) => other.examTemplate)
    discipline: Discipline[];

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

export default ExamTemplate;
