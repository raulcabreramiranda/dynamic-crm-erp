/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import tablesName from '../../tablesName';

@Entity(tablesName['DisciplineSuperPro'] ?? 'DisciplineSuperPro')
export class DisciplineSuperPro extends BaseEntity {
    static columnsMetaData() {
        return {
            shortNameSuperPro: String,
            nameSuperPro: String,
            shortName: String,
            name: String,
            level1Id: Number,
        };
    }

    @Column({ name: 'shortNameSuperPro', nullable: true })
    @ApiProperty({ required: false })
    shortNameSuperPro: string;

    @Column({ name: 'nameSuperPro', nullable: true })
    @ApiProperty({ required: false })
    nameSuperPro: string;

    @Column({ name: 'shortName', nullable: true })
    @ApiProperty({ required: false })
    shortName: string;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ type: 'integer', name: 'level1Id', nullable: true })
    @ApiProperty({ required: false })
    level1Id: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default DisciplineSuperPro;
