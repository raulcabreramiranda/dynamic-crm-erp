/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Exam } from '../../exam/_base/exam.entity';
import { StudentExam } from '../../student-exam/_base/student-exam.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';
import { ExamCard } from '../../exam-card/_base/exam-card.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ExamCardRead'] ?? 'ExamCardRead')
export class ExamCardRead extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            file: String,
            readedFile: String,
            template: String,
            answers: String,
            readedResponses: String,
            columnsAnswers: String,
            discursive: String,
            reading: String,
            readingTP: String,
            fileOriginal: String,
            exam: Exam,
            studentExam: StudentExam,
            student: AdminUser,
            examCard: ExamCard,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'text', name: 'file', nullable: true })
    @ApiProperty({ required: false })
    file: string;

    @Column({ name: 'readedFile', nullable: true })
    @ApiProperty({ required: false })
    readedFile: string;

    @Column({ name: 'template', nullable: true })
    @ApiProperty({ required: false })
    template: string;

    @Column({ name: 'answers', nullable: true })
    @ApiProperty({ required: false })
    answers: string;

    @Column({ name: 'readedResponses', nullable: true })
    @ApiProperty({ required: false })
    readedResponses: string;

    @Column({ type: 'text', name: 'columnsAnswers', nullable: true })
    @ApiProperty({ required: false })
    columnsAnswers: string;

    @Column({ type: 'text', name: 'discursive', nullable: true })
    @ApiProperty({ required: false })
    discursive: string;

    @Column({ type: 'text', name: 'reading', nullable: true })
    @ApiProperty({ required: false })
    reading: string;

    @Column({ name: 'readingTP', nullable: true })
    @ApiProperty({ required: false })
    readingTP: string;

    @Column({ name: 'fileOriginal', nullable: true })
    @ApiProperty({ required: false })
    fileOriginal: string;

    @ManyToOne(() => Exam)
    exam: Exam;

    @OneToMany(() => StudentExam, (other) => other.examCardRead)
    studentExam: StudentExam[];

    @ManyToOne(() => AdminUser)
    student: AdminUser;

    @ManyToOne(() => ExamCard)
    examCard: ExamCard;

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

export default ExamCardRead;
