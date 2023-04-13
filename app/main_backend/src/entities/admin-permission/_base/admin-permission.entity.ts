/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminPermissionProfile } from '../../admin-permission-profile/_base/admin-permission-profile.entity';
import { AdminPermissionUser } from '../../admin-permission-user/_base/admin-permission-user.entity';
import { AdminPermissionSession } from './admin-permission-session.enum';
import { AdminPermissionMethod } from './admin-permission-method.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminPermission'] ?? 'AdminPermission')
export class AdminPermission extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            session: AdminPermissionSession,
            method: AdminPermissionMethod,
            adminPermissionProfiles: AdminPermissionProfile,
            adminPermissionUsers: AdminPermissionUser,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ type: 'simple-enum', name: 'session', enum: AdminPermissionSession, nullable: true })
    @ApiProperty({ required: false })
    session: AdminPermissionSession;

    @Column({ type: 'simple-enum', name: 'method', enum: AdminPermissionMethod, nullable: true })
    @ApiProperty({ required: false })
    method: AdminPermissionMethod;

    @OneToMany(() => AdminPermissionProfile, (other) => other.adminPermission)
    adminPermissionProfiles: AdminPermissionProfile[];

    @OneToMany(() => AdminPermissionUser, (other) => other.adminPermission)
    adminPermissionUsers: AdminPermissionUser[];

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

export default AdminPermission;
