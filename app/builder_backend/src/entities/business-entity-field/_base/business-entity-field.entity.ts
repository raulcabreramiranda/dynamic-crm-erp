/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { BusinessEntity } from '../../business-entity/_base/business-entity.entity';
import { BusinessEntityFieldFieldType } from './business-entity-field-field-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['BusinessEntityField'] ?? 'BusinessEntityField')
export class BusinessEntityField extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            fieldName: String,
            fieldNameHumanized: String,
            fieldType: BusinessEntityFieldFieldType,
            businessEntity: BusinessEntity,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'fieldName', nullable: true })
    @ApiProperty({ required: false })
    fieldName: string;

    @Column({ name: 'fieldNameHumanized', nullable: true })
    @ApiProperty({ required: false })
    fieldNameHumanized: string;

    @Column({ type: 'simple-enum', name: 'fieldType', enum: BusinessEntityFieldFieldType, nullable: true })
    @ApiProperty({ required: false })
    fieldType: BusinessEntityFieldFieldType;

    @ManyToOne(() => BusinessEntity, (other) => other.businessEntityField)
    businessEntity: BusinessEntity;

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

export default BusinessEntityField;
