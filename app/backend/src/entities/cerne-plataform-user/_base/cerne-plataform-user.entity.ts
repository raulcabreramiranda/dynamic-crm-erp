/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminUser } from '../../admin-user/_base/admin-user.entity';
import { CernePlataform } from '../../cerne-plataform/_base/cerne-plataform.entity';
import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { CerneDegree } from '../../cerne-degree/_base/cerne-degree.entity';
import { Discipline } from '../../discipline/_base/discipline.entity';
import { UserType } from './user-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['CernePlataformUser'] ?? 'CernePlataformUser')
export class CernePlataformUser extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            year: Number,
            userType: UserType,
            user: AdminUser,
            plataform: CernePlataform,
            class: CerneClass,
            degree: CerneDegree,
            discipline: Discipline,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'integer', name: 'year', nullable: true })
    @ApiProperty({ required: false })
    year: number;

    @Column({ type: 'simple-enum', name: 'userType', enum: UserType, nullable: true })
    @ApiProperty({ required: false })
    userType: UserType;

    @ManyToOne(() => AdminUser)
    user: AdminUser;

    @ManyToOne(() => CernePlataform)
    plataform: CernePlataform;

    @ManyToOne(() => CerneClass)
    class: CerneClass;

    @ManyToOne(() => CerneDegree)
    degree: CerneDegree;

    @ManyToOne(() => Discipline)
    discipline: Discipline;

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

export default CernePlataformUser;
