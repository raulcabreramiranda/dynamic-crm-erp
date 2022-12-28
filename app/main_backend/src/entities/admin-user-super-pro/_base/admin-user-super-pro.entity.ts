/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminUser } from '../../admin-user/_base/admin-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminUserSuperPro'] ?? 'AdminUserSuperPro')
export class AdminUserSuperPro extends BaseEntity {
    static columnsMetaData() {
        return {
            email: String,
            emailSuperPro: String,
            passwordSuperPro: String,
            theacher: AdminUser,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'email', nullable: true })
    @ApiProperty({ required: false })
    email: string;

    @Column({ name: 'emailSuperPro', nullable: true })
    @ApiProperty({ required: false })
    emailSuperPro: string;

    @Column({ name: 'passwordSuperPro', nullable: true })
    @ApiProperty({ required: false })
    passwordSuperPro: string;

    @OneToOne(() => AdminUser)
    @JoinColumn()
    theacher: AdminUser;

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

export default AdminUserSuperPro;
