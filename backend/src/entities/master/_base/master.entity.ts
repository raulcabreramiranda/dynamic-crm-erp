/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ExamsMaster } from '../../exams-master/_base/exams-master.entity';
import { Type } from './type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['Master'] ?? 'Master')
export class Master extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            type: Type,
            examsMaster: ExamsMaster,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ type: 'simple-enum', name: 'type', enum: Type, nullable: true })
    @ApiProperty({ required: false })
    type: Type;

    @OneToMany(() => ExamsMaster, (other) => other.master)
    examsMaster: ExamsMaster[];

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

export default Master;
