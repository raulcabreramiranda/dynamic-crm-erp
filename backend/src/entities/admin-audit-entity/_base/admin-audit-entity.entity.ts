/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminAuditEntity'] ?? 'AdminAuditEntity')
export class AdminAuditEntity extends BaseEntity {
    static columnsMetaData() {
        return {
            entityId: Number,
            entityType: String,
            action: String,
            entityValue: String,
            entityKeyDiff: String,
            commitVersion: Number,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ type: 'integer', name: 'entityId', nullable: true })
    @ApiProperty({ required: false })
    entityId: number;

    @Column({ name: 'entityType', nullable: true })
    @ApiProperty({ required: false })
    entityType: string;

    @Column({ name: 'action', nullable: true })
    @ApiProperty({ required: false })
    action: string;

    @Column({ type: 'text', name: 'entityValue', nullable: true })
    @ApiProperty({ required: false })
    entityValue: string;

    @Column({ type: 'text', name: 'entityKeyDiff', nullable: true })
    @ApiProperty({ required: false })
    entityKeyDiff: string;

    @Column({ type: 'integer', name: 'commitVersion', nullable: true })
    @ApiProperty({ required: false })
    commitVersion: number;

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

export default AdminAuditEntity;
