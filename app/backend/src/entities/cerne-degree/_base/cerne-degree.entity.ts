/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Contents } from '../../contents/_base/contents.entity';
import { Exam } from '../../exam/_base/exam.entity';
import { CernePlataformUser } from '../../cerne-plataform-user/_base/cerne-plataform-user.entity';
import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';
import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { Theme } from '../../theme/_base/theme.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['CerneDegree'] ?? 'CerneDegree')
export class CerneDegree extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            position: Number,
            contents: Contents,
            exam: Exam,
            cernePlataformUser: CernePlataformUser,
            jorneyDegrees: JorneyDegree,
            cerneClasses: CerneClass,
            themes: Theme,
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

    @Column({ type: 'integer', name: 'position', nullable: true })
    @ApiProperty({ required: false })
    position: number;

    @OneToMany(() => Contents, (other) => other.series)
    contents: Contents[];

    @OneToMany(() => Exam, (other) => other.cerneDegree)
    exam: Exam[];

    @OneToMany(() => CernePlataformUser, (other) => other.degree)
    cernePlataformUser: CernePlataformUser[];

    @OneToMany(() => JorneyDegree, (other) => other.cerneDegree)
    jorneyDegrees: JorneyDegree[];

    @ManyToMany(() => CerneClass)
    @JoinTable({
        name: 'CerneDegreesCerneClasses',
    })
    cerneClasses: CerneClass[];

    @OneToMany(() => Theme, (other) => other.cerneDegree)
    themes: Theme[];

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

export default CerneDegree;
