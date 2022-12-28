/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminUser } from '../../admin-user/_base/admin-user.entity';
import { Discipline } from '../../discipline/_base/discipline.entity';
import { ExamsMasterKnowledgeArea } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.entity';
import { Type } from './type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['MasterTeacher'] ?? 'MasterTeacher')
export class MasterTeacher extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            finished: Boolean,
            finishedReview: Boolean,
            type: Type,
            teacher: AdminUser,
            discipline: Discipline,
            examsMasterKnowledgeArea: ExamsMasterKnowledgeArea,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'finished', nullable: true })
    @ApiProperty({ required: false })
    finished: boolean;

    @Column({ name: 'finishedReview', nullable: true })
    @ApiProperty({ required: false })
    finishedReview: boolean;

    @Column({ type: 'simple-enum', name: 'type', enum: Type, nullable: true })
    @ApiProperty({ required: false })
    type: Type;

    @ManyToOne(() => AdminUser)
    teacher: AdminUser;

    @ManyToOne(() => Discipline)
    discipline: Discipline;

    @ManyToOne(() => ExamsMasterKnowledgeArea)
    examsMasterKnowledgeArea: ExamsMasterKnowledgeArea;

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

export default MasterTeacher;
