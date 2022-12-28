/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Essay } from '../../essay/_base/essay.entity';
import { MatrixAnnulmentReason } from '../../matrix-annulment-reason/_base/matrix-annulment-reason.entity';
import { Skill } from '../../skill/_base/skill.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['Matrix'] ?? 'Matrix')
export class Matrix extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            essays: Essay,
            matrixAnnulmentReasons: MatrixAnnulmentReason,
            skills: Skill,
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

    @OneToMany(() => Essay, (other) => other.matrix)
    essays: Essay[];

    @OneToMany(() => MatrixAnnulmentReason, (other) => other.matrix)
    matrixAnnulmentReasons: MatrixAnnulmentReason[];

    @OneToMany(() => Skill, (other) => other.matrix)
    skills: Skill[];

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

export default Matrix;
