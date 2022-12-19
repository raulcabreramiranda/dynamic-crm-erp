/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Contents } from '../../contents/_base/contents.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['SubContents'] ?? 'SubContents')
export class SubContents extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            enemincidenceparameter: Number,
            enemIncidencePercent: Number,
            content: Contents,
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

    @Column({ type: 'float', name: 'enemincidenceparameter', nullable: true })
    @ApiProperty({ required: false })
    enemincidenceparameter: number;

    @Column({ type: 'integer', name: 'enemIncidencePercent', nullable: true })
    @ApiProperty({ required: false })
    enemIncidencePercent: number;

    @ManyToOne(() => Contents)
    content: Contents;

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

export default SubContents;
