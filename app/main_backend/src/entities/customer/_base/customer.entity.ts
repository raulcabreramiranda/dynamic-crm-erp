/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { CustomerPersonType } from './customer-person-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['Customer'] ?? 'Customer')
export class Customer extends BaseEntity {
    static columnsMetaData() {
        return {
            commercialName: String,
            corporateName: String,
            personType: CustomerPersonType,
            cnpj: String,
            cpf: String,
            address: String,
            telephone: String,
            email: String,
            technicalManagerName: String,
            technicalManagerSector: String,
            technicalManagerFunction: String,
            technicalManagerContact: String,
            technicalManagerEmail: String,
        };
    }

    @Column({ name: 'commercialName', nullable: true })
    @ApiProperty({ required: false })
    commercialName: string;

    @Column({ name: 'corporateName', nullable: true })
    @ApiProperty({ required: false })
    corporateName: string;

    @Column({ type: 'simple-enum', name: 'personType', enum: CustomerPersonType, nullable: true })
    @ApiProperty({ required: false })
    personType: CustomerPersonType;

    @Column({ name: 'cnpj', nullable: true })
    @ApiProperty({ required: false })
    cnpj: string;

    @Column({ name: 'cpf', nullable: true })
    @ApiProperty({ required: false })
    cpf: string;

    @Column({ name: 'address', nullable: true })
    @ApiProperty({ required: false })
    address: string;

    @Column({ name: 'telephone', nullable: true })
    @ApiProperty({ required: false })
    telephone: string;

    @Column({ name: 'email', nullable: true })
    @ApiProperty({ required: false })
    email: string;

    @Column({ name: 'technicalManagerName', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerName: string;

    @Column({ name: 'technicalManagerSector', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerSector: string;

    @Column({ name: 'technicalManagerFunction', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerFunction: string;

    @Column({ name: 'technicalManagerContact', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerContact: string;

    @Column({ name: 'technicalManagerEmail', nullable: true })
    @ApiProperty({ required: false })
    technicalManagerEmail: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default Customer;
