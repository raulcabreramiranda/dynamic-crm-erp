/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ExamConfigureApplication } from '../../exam-configure-application/_base/exam-configure-application.entity';
import { CernePlataformUser } from '../../cerne-plataform-user/_base/cerne-plataform-user.entity';
import { Essay } from '../../essay/_base/essay.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';
import { ConfigureApplication } from '../../configure-application/_base/configure-application.entity';
import { ConfigureCorrection } from '../../configure-correction/_base/configure-correction.entity';
import { CerneDegree } from '../../cerne-degree/_base/cerne-degree.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['CerneClass'] ?? 'CerneClass')
export class CerneClass extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            examConfigureApplication: ExamConfigureApplication,
            cernePlataformUser: CernePlataformUser,
            essays: Essay,
            adminUsers: AdminUser,
            configureApplications: ConfigureApplication,
            configureCorrections: ConfigureCorrection,
            cerneDegrees: CerneDegree,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @OneToMany(() => ExamConfigureApplication, (other) => other.cerneClass)
    examConfigureApplication: ExamConfigureApplication[];

    @OneToMany(() => CernePlataformUser, (other) => other.class)
    cernePlataformUser: CernePlataformUser[];

    @OneToMany(() => Essay, (other) => other.cerneClass)
    essays: Essay[];

    @OneToMany(() => AdminUser, (other) => other.cerneClass)
    adminUsers: AdminUser[];

    @OneToMany(() => ConfigureApplication, (other) => other.cerneClass)
    configureApplications: ConfigureApplication[];

    @OneToMany(() => ConfigureCorrection, (other) => other.cerneClass)
    configureCorrections: ConfigureCorrection[];

    @ManyToMany(() => CerneDegree)
    @JoinTable({
        name: 'CerneDegreesCerneClasses',
        joinColumn: { name: 'cerneClassId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'cerneDegreeId', referencedColumnName: 'id' },
    })
    cerneDegrees: CerneDegree[];

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

export default CerneClass;
