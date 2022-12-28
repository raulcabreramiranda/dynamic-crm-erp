/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Exam } from '../../exam/_base/exam.entity';
import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { ProductionType } from './production-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['ExamConfigureApplication'] ?? 'ExamConfigureApplication')
export class ExamConfigureApplication extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            dateInitial: Date,
            dateFinal: Date,
            productionType: ProductionType,
            mixingQuestions: Boolean,
            supervise: Boolean,
            limitTime: Number,
            scheduleReleaseResults: Date,
            exam: Exam,
            cerneClass: CerneClass,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'datetime', name: 'dateInitial', nullable: true })
    @ApiProperty({ required: false })
    dateInitial: Date;

    @Column({ type: 'datetime', name: 'dateFinal', nullable: true })
    @ApiProperty({ required: false })
    dateFinal: Date;

    @Column({ type: 'simple-enum', name: 'productionType', enum: ProductionType, nullable: true })
    @ApiProperty({ required: false })
    productionType: ProductionType;

    @Column({ name: 'mixingQuestions', nullable: true })
    @ApiProperty({ required: false })
    mixingQuestions: boolean;

    @Column({ name: 'supervise', nullable: true })
    @ApiProperty({ required: false })
    supervise: boolean;

    @Column({ type: 'integer', name: 'limitTime', nullable: true })
    @ApiProperty({ required: false })
    limitTime: number;

    @Column({ type: 'datetime', name: 'scheduleReleaseResults', nullable: true })
    @ApiProperty({ required: false })
    scheduleReleaseResults: Date;

    @ManyToOne(() => Exam)
    exam: Exam;

    @ManyToOne(() => CerneClass)
    cerneClass: CerneClass;

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

export default ExamConfigureApplication;
