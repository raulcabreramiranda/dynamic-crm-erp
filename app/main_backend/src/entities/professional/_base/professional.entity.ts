/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import tablesName from '../../tablesName';

@Entity(tablesName['Professional'] ?? 'Professional')
export class Professional extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            birthDate: Date,
            cpf: String,
            rg: String,
            telephone: String,
            email: String,
            contract: String,
            startDate: Date,
            endDate: Date,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ type: 'date', name: 'birthDate', nullable: true })
    @ApiProperty({ required: false })
    birthDate: Date;

    @Column({ name: 'cpf', nullable: true })
    @ApiProperty({ required: false })
    cpf: string;

    @Column({ name: 'rg', nullable: true })
    @ApiProperty({ required: false })
    rg: string;

    @Column({ name: 'telephone', nullable: true })
    @ApiProperty({ required: false })
    telephone: string;

    @Column({ name: 'email', nullable: true })
    @ApiProperty({ required: false })
    email: string;

    @Column({ name: 'contract', nullable: true })
    @ApiProperty({ required: false })
    contract: string;

    @Column({ type: 'date', name: 'startDate', nullable: true })
    @ApiProperty({ required: false })
    startDate: Date;

    @Column({ type: 'date', name: 'endDate', nullable: true })
    @ApiProperty({ required: false })
    endDate: Date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default Professional;
