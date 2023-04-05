/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminPermissionProfile } from '../../admin-permission-profile/_base/admin-permission-profile.entity';
import { AdminPermissionUser } from '../../admin-permission-user/_base/admin-permission-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminPermission'] ?? 'AdminPermission')
export class AdminPermission extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            slug: String,
            view: Boolean,
            resgister: Boolean,
            edit: Boolean,
            deleteRow: Boolean,
            report: Boolean,
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

    @Column({ name: 'slug', nullable: true })
    @ApiProperty({ required: false })
    slug: string;

    @Column({ name: 'view', nullable: true })
    @ApiProperty({ required: false })
    view: boolean;

    @Column({ name: 'resgister', nullable: true })
    @ApiProperty({ required: false })
    resgister: boolean;

    @Column({ name: 'edit', nullable: true })
    @ApiProperty({ required: false })
    edit: boolean;

    @Column({ name: 'deleteRow', nullable: true })
    @ApiProperty({ required: false })
    deleteRow: boolean;

    @Column({ name: 'report', nullable: true })
    @ApiProperty({ required: false })
    report: boolean;

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
