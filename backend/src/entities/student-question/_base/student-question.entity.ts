/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { StudentExam } from '../../student-exam/_base/student-exam.entity';
import { ExamTemplate } from '../../exam-template/_base/exam-template.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['StudentQuestion'] ?? 'StudentQuestion')
export class StudentQuestion extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            scoreQuestion: Number,
            questionScoreAnnulment: Number,
            questionAnswer: String,
            teacherComment: String,
            questionAnswerDiscursive: String,
            date: Date,
            studentExam: StudentExam,
            examTemplate: ExamTemplate,
            teacher: AdminUser,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'float', name: 'scoreQuestion', nullable: true })
    @ApiProperty({ required: false })
    scoreQuestion: number;

    @Column({ type: 'float', name: 'questionScoreAnnulment', nullable: true })
    @ApiProperty({ required: false })
    questionScoreAnnulment: number;

    @Column({ name: 'questionAnswer', nullable: true })
    @ApiProperty({ required: false })
    questionAnswer: string;

    @Column({ type: 'text', name: 'teacherComment', nullable: true })
    @ApiProperty({ required: false })
    teacherComment: string;

    @Column({ type: 'text', name: 'questionAnswerDiscursive', nullable: true })
    @ApiProperty({ required: false })
    questionAnswerDiscursive: string;

    @Column({ type: 'date', name: 'date', nullable: true })
    @ApiProperty({ required: false })
    date: Date;

    @ManyToOne(() => StudentExam)
    studentExam: StudentExam;

    @ManyToOne(() => ExamTemplate)
    examTemplate: ExamTemplate;

    @OneToMany(() => AdminUser, (other) => other.studentQuestion)
    teacher: AdminUser[];

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

export default StudentQuestion;
