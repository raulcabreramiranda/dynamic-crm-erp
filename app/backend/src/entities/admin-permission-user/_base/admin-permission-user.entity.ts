/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminPermission } from '../../admin-permission/_base/admin-permission.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminPermissionUser'] ?? 'AdminPermissionUser')
export class AdminPermissionUser extends BaseEntity {
    static columnsMetaData() {
        return {
            view: Boolean,
            resgister: Boolean,
            edit: Boolean,
            deleteRow: Boolean,
            report: Boolean,
            adminPermission: AdminPermission,
            adminUser: AdminUser,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

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

    @ManyToOne(() => AdminPermission, (other) => other.adminPermissionUsers)
    adminPermission: AdminPermission;

    @ManyToOne(() => AdminUser, (other) => other.adminPermissionUsers)
    adminUser: AdminUser;

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

export default AdminPermissionUser;
