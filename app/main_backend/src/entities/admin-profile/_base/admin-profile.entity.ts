/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminPermissionProfile } from '../../admin-permission-profile/_base/admin-permission-profile.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminProfile'] ?? 'AdminProfile')
export class AdminProfile extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            status: Number,
            adminPermissionProfiles: AdminPermissionProfile,
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

    @Column({ type: 'integer', name: 'status', nullable: true })
    @ApiProperty({ required: false })
    status: number;

    @OneToMany(() => AdminPermissionProfile, (other) => other.adminProfile)
    adminPermissionProfiles: AdminPermissionProfile[];

    @OneToMany(() => AdminUser, (other) => other.adminProfile)
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

export default AdminProfile;
