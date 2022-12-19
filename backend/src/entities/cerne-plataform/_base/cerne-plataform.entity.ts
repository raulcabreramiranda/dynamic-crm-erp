/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { CernePlataformUser } from '../../cerne-plataform-user/_base/cerne-plataform-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['CernePlataform'] ?? 'CernePlataform')
export class CernePlataform extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            link: String,
            assessmentModelId: Number,
            api: String,
            token: String,
            domain: String,
            clientId: Number,
            clientName: String,
            clientPrimaryColor: String,
            clientSecondaryColor: String,
            clientImage: String,
            clientImageHeader: String,
            clientImageFooter: String,
            cernePlataformUser: CernePlataformUser,
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

    @Column({ name: 'link', nullable: true })
    @ApiProperty({ required: false })
    link: string;

    @Column({ type: 'integer', name: 'assessmentModelId', nullable: true })
    @ApiProperty({ required: false })
    assessmentModelId: number;

    @Column({ name: 'api', nullable: true })
    @ApiProperty({ required: false })
    api: string;

    @Column({ name: 'token', nullable: true })
    @ApiProperty({ required: false })
    token: string;

    @Column({ name: 'domain', nullable: true })
    @ApiProperty({ required: false })
    domain: string;

    @Column({ type: 'integer', name: 'clientId', nullable: true })
    @ApiProperty({ required: false })
    clientId: number;

    @Column({ name: 'clientName', nullable: true })
    @ApiProperty({ required: false })
    clientName: string;

    @Column({ name: 'clientPrimaryColor', nullable: true })
    @ApiProperty({ required: false })
    clientPrimaryColor: string;

    @Column({ name: 'clientSecondaryColor', nullable: true })
    @ApiProperty({ required: false })
    clientSecondaryColor: string;

    @Column({ name: 'clientImage', nullable: true })
    @ApiProperty({ required: false })
    clientImage: string;

    @Column({ name: 'clientImageHeader', nullable: true })
    @ApiProperty({ required: false })
    clientImageHeader: string;

    @Column({ name: 'clientImageFooter', nullable: true })
    @ApiProperty({ required: false })
    clientImageFooter: string;

    @OneToMany(() => CernePlataformUser, (other) => other.plataform)
    cernePlataformUser: CernePlataformUser[];

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

export default CernePlataform;
