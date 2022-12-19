/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ExamCardRead } from '../../exam-card-read/_base/exam-card-read.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ExamCard'] ?? 'ExamCard')
export class ExamCard extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            active: Boolean,
            templateGeneration: String,
            templateReading: String,
            templateBlank: String,
            phpCustom: String,
            phpCustomReading: String,
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

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'active', nullable: true })
    @ApiProperty({ required: false })
    active: boolean;

    @Column({ type: 'text', name: 'templateGeneration', nullable: true })
    @ApiProperty({ required: false })
    templateGeneration: string;

    @Column({ type: 'text', name: 'templateReading', nullable: true })
    @ApiProperty({ required: false })
    templateReading: string;

    @Column({ type: 'text', name: 'templateBlank', nullable: true })
    @ApiProperty({ required: false })
    templateBlank: string;

    @Column({ type: 'text', name: 'phpCustom', nullable: true })
    @ApiProperty({ required: false })
    phpCustom: string;

    @Column({ type: 'text', name: 'phpCustomReading', nullable: true })
    @ApiProperty({ required: false })
    phpCustomReading: string;

    @OneToMany(() => ExamCardRead, (other) => other.examCard)
    examCardRead: ExamCardRead[];

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

export default ExamCard;
