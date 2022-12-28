/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ExamConfigureApplication } from '../../exam-configure-application/_base/exam-configure-application.entity';
import { StudentExam } from '../../student-exam/_base/student-exam.entity';
import { ExamCardRead } from '../../exam-card-read/_base/exam-card-read.entity';
import { ExamsMaster } from '../../exams-master/_base/exams-master.entity';
import { Discipline } from '../../discipline/_base/discipline.entity';
import { ExamTemplate } from '../../exam-template/_base/exam-template.entity';
import { ExamType } from '../../exam-type/_base/exam-type.entity';
import { CerneDegree } from '../../cerne-degree/_base/cerne-degree.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['Exam'] ?? 'Exam')
export class Exam extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            year: Number,
            company: String,
            description: String,
            hasForeignLanguage: Boolean,
            emailWord: String,
            typeIdTest: Number,
            dayApplication: Number,
            superProId: Number,
            examData: String,
            instructions: String,
            systemEvaluation: String,
            urlS3: String,
            examConfigureApplication: ExamConfigureApplication,
            studentExam: StudentExam,
            examCardRead: ExamCardRead,
            examsMaster: ExamsMaster,
            discipline: Discipline,
            examTemplate: ExamTemplate,
            examType: ExamType,
            cerneDegree: CerneDegree,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'integer', name: 'year', nullable: true })
    @ApiProperty({ required: false })
    year: number;

    @Column({ name: 'company', nullable: true })
    @ApiProperty({ required: false })
    company: string;

    @Column({ type: 'text', name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ name: 'hasForeignLanguage', nullable: true })
    @ApiProperty({ required: false })
    hasForeignLanguage: boolean;

    @Column({ name: 'emailWord', nullable: true })
    @ApiProperty({ required: false })
    emailWord: string;

    @Column({ type: 'integer', name: 'typeIdTest', nullable: true })
    @ApiProperty({ required: false })
    typeIdTest: number;

    @Column({ type: 'integer', name: 'dayApplication', nullable: true })
    @ApiProperty({ required: false })
    dayApplication: number;

    @Column({ type: 'integer', name: 'superProId', nullable: true })
    @ApiProperty({ required: false })
    superProId: number;

    @Column({ type: 'text', name: 'examData', nullable: true })
    @ApiProperty({ required: false })
    examData: string;

    @Column({ type: 'text', name: 'instructions', nullable: true })
    @ApiProperty({ required: false })
    instructions: string;

    @Column({ name: 'systemEvaluation', nullable: true })
    @ApiProperty({ required: false })
    systemEvaluation: string;

    @Column({ name: 'urlS3', nullable: true })
    @ApiProperty({ required: false })
    urlS3: string;

    @OneToMany(() => ExamConfigureApplication, (other) => other.exam)
    examConfigureApplication: ExamConfigureApplication[];

    @OneToMany(() => StudentExam, (other) => other.exam)
    studentExam: StudentExam[];

    @OneToMany(() => ExamCardRead, (other) => other.exam)
    examCardRead: ExamCardRead[];

    @OneToMany(() => ExamsMaster, (other) => other.exam)
    examsMaster: ExamsMaster[];

    @ManyToOne(() => Discipline)
    discipline: Discipline;

    @OneToMany(() => ExamTemplate, (other) => other.exam)
    examTemplate: ExamTemplate[];

    @ManyToOne(() => ExamType, (other) => other.exam)
    examType: ExamType;

    @ManyToOne(() => CerneDegree)
    cerneDegree: CerneDegree;

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

export default Exam;
