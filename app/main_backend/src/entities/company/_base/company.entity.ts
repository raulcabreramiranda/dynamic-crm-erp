/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import tablesName from '../../tablesName';

@Entity(tablesName['Company'] ?? 'Company')
export class Company extends BaseEntity {
    static columnsMetaData() {
        return {
            commercialNameTeste833: String,
            commercialName: String,
            corporateName: String,
            cnpj: String,
            telephone: String,
            email: String,
            address: String,
            cnae: String,
            technicalManagerName: String,
            technicalManagerCategory: String,
            technicalManagerBoardNumber: String,
        };
    }

    @Column({ name: 'commercialNameTeste833', nullable: true })
    @ApiProperty({ required: false })
    commercialNameTeste833: string;

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

    @Column({ name: 'technicalManagerName', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerName: string;

    @Column({ name: 'technicalManagerCategory', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerCategory: string;

    @Column({ name: 'technicalManagerBoardNumber', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerBoardNumber: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default Company;
