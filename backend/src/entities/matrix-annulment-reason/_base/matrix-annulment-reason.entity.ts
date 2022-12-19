/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { EssayResult } from '../../essay-result/_base/essay-result.entity';
import { Matrix } from '../../matrix/_base/matrix.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['MatrixAnnulmentReason'] ?? 'MatrixAnnulmentReason')
export class MatrixAnnulmentReason extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            comment: String,
            idRed1000: Number,
            essayResult: EssayResult,
            matrix: Matrix,
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

    @Column({ name: 'comment', nullable: true })
    @ApiProperty({ required: false })
    comment: string;

    @Column({ type: 'integer', name: 'idRed1000', nullable: true })
    @ApiProperty({ required: false })
    idRed1000: number;

    @OneToMany(() => EssayResult, (other) => other.matrixAnnulmentReason)
    essayResult: EssayResult[];

    @ManyToOne(() => Matrix, (other) => other.matrixAnnulmentReasons)
    matrix: Matrix;

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

export default MatrixAnnulmentReason;