/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import tablesName from '../../tablesName';

@Entity(tablesName['Subsidiary'] ?? 'Subsidiary')
export class Subsidiary extends BaseEntity {
    static columnsMetaData() {
        return {
            commercialName: String,
            corporateName: String,
            cnpj: String,
            telephone: String,
            email: String,
            address: String,
            cnae: String,
        };
    }

    @Column({ name: 'commercialName', nullable: true })
    @ApiProperty({ required: false })
    commercialName: string;

    @Column({ name: 'corporateName', nullable: true })
    @ApiProperty({ required: false })
    corporateName: string;

    @Column({ name: 'cnpj', nullable: true })
    @ApiProperty({ required: false })
    cnpj: string;

    @Column({ name: 'telephone', nullable: true })
    @ApiProperty({ required: false })
    telephone: string;

    @Column({ name: 'email', nullable: true })
    @ApiProperty({ required: false })
    email: string;

    @Column({ name: 'address', nullable: true })
    @ApiProperty({ required: false })
    address: string;

    @Column({ name: 'cnae', nullable: true })
    @ApiProperty({ required: false })
    cnae: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default Subsidiary;
