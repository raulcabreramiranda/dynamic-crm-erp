/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { MasterTeacher } from '../../master-teacher/_base/master-teacher.entity';
import { ContentsMasterTeacher } from '../../contents-master-teacher/_base/contents-master-teacher.entity';
import { ExamsMaster } from '../../exams-master/_base/exams-master.entity';
import { KnowledgeArea } from '../../knowledge-area/_base/knowledge-area.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ExamsMasterKnowledgeArea'] ?? 'ExamsMasterKnowledgeArea')
export class ExamsMasterKnowledgeArea extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            configurationDeadline: Date,
            review: Boolean,
            reviewDeadline: Date,
            percentageMaximum: Number,
            incidence: Number,
            entropy: Number,
            concordance: Number,
            masterTeacher: MasterTeacher,
            contentsMasterTeacher: ContentsMasterTeacher,
            examsMaster: ExamsMaster,
            knowledgeArea: KnowledgeArea,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'datetime', name: 'configurationDeadline', nullable: true })
    @ApiProperty({ required: false })
    configurationDeadline: Date;

    @Column({ name: 'review', nullable: true })
    @ApiProperty({ required: false })
    review: boolean;

    @Column({ type: 'datetime', name: 'reviewDeadline', nullable: true })
    @ApiProperty({ required: false })
    reviewDeadline: Date;

    @Column({ type: 'integer', name: 'percentageMaximum', nullable: true })
    @ApiProperty({ required: false })
    percentageMaximum: number;

    @Column({ type: 'float', name: 'incidence', nullable: true })
    @ApiProperty({ required: false })
    incidence: number;

    @Column({ type: 'float', name: 'entropy', nullable: true })
    @ApiProperty({ required: false })
    entropy: number;

    @Column({ type: 'float', name: 'concordance', nullable: true })
    @ApiProperty({ required: false })
    concordance: number;

    @OneToMany(() => MasterTeacher, (other) => other.examsMasterKnowledgeArea)
    masterTeacher: MasterTeacher[];

    @OneToMany(() => ContentsMasterTeacher, (other) => other.examsMasterKnowledgeArea)
    contentsMasterTeacher: ContentsMasterTeacher[];

    @ManyToOne(() => ExamsMaster)
    examsMaster: ExamsMaster;

    @ManyToOne(() => KnowledgeArea)
    knowledgeArea: KnowledgeArea;

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

export default ExamsMasterKnowledgeArea;
