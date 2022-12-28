/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminProfile } from '../../admin-profile/_base/admin-profile.entity';
import { AdminUserSuperPro } from '../../admin-user-super-pro/_base/admin-user-super-pro.entity';
import { AdminPermissionUser } from '../../admin-permission-user/_base/admin-permission-user.entity';
import { AdminWhiteLabel } from '../../admin-white-label/_base/admin-white-label.entity';
import { UserType } from './user-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminUser'] ?? 'AdminUser')
export class AdminUser extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            login: String,
            fullname: String,
            cellphone: String,
            phone: String,
            email: String,
            activated: Boolean,
            langKey: String,
            password: String,
            imageUrl: String,
            imageUrlContentType: String,
            resetDate: String,
            re: String,
            ra: String,
            userType: UserType,
            clientId: Number,
            adminProfile: AdminProfile,
            adminUserSuperPro: AdminUserSuperPro,
            adminPermissionUsers: AdminPermissionUser,
            adminWhiteLabel: AdminWhiteLabel,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'login', nullable: true })
    @ApiProperty({ required: false })
    login: string;

    @Column({ name: 'fullname', nullable: true })
    @ApiProperty({ required: false })
    fullname: string;

    @Column({ name: 'cellphone', nullable: true })
    @ApiProperty({ required: false })
    cellphone: string;

    @Column({ name: 'phone', nullable: true })
    @ApiProperty({ required: false })
    phone: string;

    @Column({ name: 'email', nullable: true })
    @ApiProperty({ required: false })
    email: string;

    @Column({ name: 'activated', nullable: true })
    @ApiProperty({ required: false })
    activated: boolean;

    @Column({ name: 'langKey', nullable: true })
    @ApiProperty({ required: false })
    langKey: string;

    @Column({ name: 'password', nullable: true })
    @ApiProperty({ required: false })
    password: string;

    @Column({ type: 'text', name: 'imageUrl', nullable: true })
    @ApiProperty({ required: false })
    imageUrl: string;

    @Column({ name: 'imageUrlContentType', nullable: true })
    @ApiProperty({ required: false })
    imageUrlContentType: string;

    @Column({ name: 'resetDate', nullable: true })
    @ApiProperty({ required: false })
    resetDate: string;

    @Column({ name: 're', nullable: true })
    @ApiProperty({ required: false })
    re: string;

    @Column({ name: 'ra', nullable: true })
    @ApiProperty({ required: false })
    ra: string;

    @Column({ type: 'simple-enum', name: 'userType', enum: UserType, nullable: true })
    @ApiProperty({ required: false })
    userType: UserType;

    @Column({ type: 'integer', name: 'clientId', nullable: true })
    @ApiProperty({ required: false })
    clientId: number;

    @ManyToOne(() => AdminProfile, (other) => other.adminUsers)
    adminProfile: AdminProfile;

    @OneToOne(() => AdminUserSuperPro)
    adminUserSuperPro: AdminUserSuperPro;

    @OneToMany(() => AdminPermissionUser, (other) => other.adminUser)
    adminPermissionUsers: AdminPermissionUser[];

    @ManyToOne(() => AdminWhiteLabel, (other) => other.adminUsers)
    adminWhiteLabel: AdminWhiteLabel;

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

export default AdminUser;
