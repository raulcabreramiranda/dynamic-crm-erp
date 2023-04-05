/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { BusinessEntityField } from '../../business-entity-field/_base/business-entity-field.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['BusinessEntity'] ?? 'BusinessEntity')
export class BusinessEntity extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            entityName: String,
            entityNameHumanized: String,
            entityNameHumanizedPlural: String,
            frontPath: String,
            hasWhiteLabel: Boolean,
            hasDateAudit: Boolean,
            businessEntityField: BusinessEntityField,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'entityName', nullable: true })
    @ApiProperty({ required: false })
    entityName: string;

    @Column({ name: 'entityNameHumanized', nullable: true })
    @ApiProperty({ required: false })
    entityNameHumanized: string;

    @Column({ name: 'entityNameHumanizedPlural', nullable: true })
    @ApiProperty({ required: false })
    entityNameHumanizedPlural: string;

    @Column({ name: 'frontPath', nullable: true })
    @ApiProperty({ required: false })
    frontPath: string;

    @Column({ name: 'hasWhiteLabel', nullable: true })
    @ApiProperty({ required: false })
    hasWhiteLabel: boolean;

    @Column({ name: 'hasDateAudit', nullable: true })
    @ApiProperty({ required: false })
    hasDateAudit: boolean;

    @OneToMany(() => BusinessEntityField, (other) => other.businessEntity)
    businessEntityField: BusinessEntityField[];

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

export default BusinessEntity;
