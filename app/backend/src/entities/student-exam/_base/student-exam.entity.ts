/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { StudentQuestion } from '../../student-question/_base/student-question.entity';
import { Exam } from '../../exam/_base/exam.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';
import { ExamCardRead } from '../../exam-card-read/_base/exam-card-read.entity';
import { ChoiceForeignLanguage } from './choice-foreign-language.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['StudentExam'] ?? 'StudentExam')
export class StudentExam extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            note: Number,
            answerTemplate: String,
            delivered: Boolean,
            blocked: Boolean,
            endDate: Date,
            qtExternalConsultations: Number,
            choiceForeignLanguage: ChoiceForeignLanguage,
            reOpenEndTime: Date,
            cerneClass: CerneClass,
            studentQuestion: StudentQuestion,
            exam: Exam,
            student: AdminUser,
            examCardRead: ExamCardRead,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'float', name: 'note', nullable: true })
    @ApiProperty({ required: false })
    note: number;

    @Column({ name: 'answerTemplate', nullable: true })
    @ApiProperty({ required: false })
    answerTemplate: string;

    @Column({ name: 'delivered', nullable: true })
    @ApiProperty({ required: false })
    delivered: boolean;

    @Column({ name: 'blocked', nullable: true })
    @ApiProperty({ required: false })
    blocked: boolean;

    @Column({ type: 'datetime', name: 'endDate', nullable: true })
    @ApiProperty({ required: false })
    endDate: Date;

    @Column({ type: 'integer', name: 'qtExternalConsultations', nullable: true })
    @ApiProperty({ required: false })
    qtExternalConsultations: number;

    @Column({ type: 'simple-enum', name: 'choiceForeignLanguage', enum: ChoiceForeignLanguage, nullable: true })
    @ApiProperty({ required: false })
    choiceForeignLanguage: ChoiceForeignLanguage;

    @Column({ type: 'datetime', name: 'reOpenEndTime', nullable: true })
    @ApiProperty({ required: false })
    reOpenEndTime: Date;

    @ManyToOne(() => CerneClass)
    cerneClass: CerneClass;

    @OneToMany(() => StudentQuestion, (other) => other.studentExam)
    studentQuestion: StudentQuestion[];

    @ManyToOne(() => Exam)
    exam: Exam;

    @ManyToOne(() => AdminUser)
    student: AdminUser;

    @ManyToOne(() => ExamCardRead)
    examCardRead: ExamCardRead;

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

export default StudentExam;
