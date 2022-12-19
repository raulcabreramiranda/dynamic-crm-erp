/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ExamsMasterKnowledgeArea } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.entity';
import { Master } from '../../master/_base/master.entity';
import { Exam } from '../../exam/_base/exam.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ExamsMaster'] ?? 'ExamsMaster')
export class ExamsMaster extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            year: Number,
            status: String,
            cardPrinted: Boolean,
            examsMasterKnowledgeArea: ExamsMasterKnowledgeArea,
            master: Master,
            exam: Exam,
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

    @Column({ name: 'status', nullable: true })
    @ApiProperty({ required: false })
    status: string;

    @Column({ name: 'cardPrinted', nullable: true })
    @ApiProperty({ required: false })
    cardPrinted: boolean;

    @OneToMany(() => ExamsMasterKnowledgeArea, (other) => other.examsMaster)
    examsMasterKnowledgeArea: ExamsMasterKnowledgeArea[];

    @ManyToOne(() => Master)
    master: Master;

    @ManyToOne(() => Exam)
    exam: Exam;

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

export default ExamsMaster;
