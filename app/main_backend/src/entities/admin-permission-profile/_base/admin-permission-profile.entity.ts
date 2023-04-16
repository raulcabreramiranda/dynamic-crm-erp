/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminPermission } from '../../admin-permission/_base/admin-permission.entity';
import { AdminProfile } from '../../admin-profile/_base/admin-profile.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminPermissionProfile'] ?? 'AdminPermissionProfile')
export class AdminPermissionProfile extends BaseEntity {
    static columnsMetaData() {
        return {
            adminPermission: AdminPermission,
            adminProfile: AdminProfile,
        };
    }

    @ManyToOne(() => AdminPermission, (other) => other.adminPermissionProfiles)
    adminPermission: AdminPermission;

    @ManyToOne(() => AdminProfile, (other) => other.adminPermissionProfiles)
    adminProfile: AdminProfile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default AdminPermissionProfile;
