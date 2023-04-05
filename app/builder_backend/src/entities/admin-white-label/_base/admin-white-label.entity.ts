/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminUser } from '../../admin-user/_base/admin-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminWhiteLabel'] ?? 'AdminWhiteLabel')
export class AdminWhiteLabel extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            logo: String,
            logoContentType: String,
            socialReason: String,
            fantasyName: String,
            cnpj: String,
            zipCode: String,
            street: String,
            complement: String,
            number: String,
            neighborhood: String,
            city: String,
            uf: String,
            adminUsers: AdminUser,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ type: 'text', name: 'logo', nullable: true })
    @ApiProperty({ required: false })
    logo: string;

    @Column({ name: 'logoContentType', nullable: true })
    @ApiProperty({ required: false })
    logoContentType: string;

    @Column({ name: 'socialReason', nullable: true })
    @ApiProperty({ required: false })
    socialReason: string;

    @Column({ name: 'fantasyName', nullable: true })
    @ApiProperty({ required: false })
    fantasyName: string;

    @Column({ name: 'cnpj', nullable: true })
    @ApiProperty({ required: false })
    cnpj: string;

    @Column({ name: 'zipCode', nullable: true })
    @ApiProperty({ required: false })
    zipCode: string;

    @Column({ name: 'street', nullable: true })
    @ApiProperty({ required: false })
    street: string;

    @Column({ name: 'complement', nullable: true })
    @ApiProperty({ required: false })
    complement: string;

    @Column({ name: 'number', nullable: true })
    @ApiProperty({ required: false })
    number: string;

    @Column({ name: 'neighborhood', nullable: true })
    @ApiProperty({ required: false })
    neighborhood: string;

    @Column({ name: 'city', nullable: true })
    @ApiProperty({ required: false })
    city: string;

    @Column({ name: 'uf', nullable: true })
    @ApiProperty({ required: false })
    uf: string;

    @OneToMany(() => AdminUser, (other) => other.adminWhiteLabel)
    adminUsers: AdminUser[];

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

export default AdminWhiteLabel;
