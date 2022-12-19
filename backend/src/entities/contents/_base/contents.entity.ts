/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { SubContents } from '../../sub-contents/_base/sub-contents.entity';
import { Discipline } from '../../discipline/_base/discipline.entity';
import { CerneDegree } from '../../cerne-degree/_base/cerne-degree.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['Contents'] ?? 'Contents')
export class Contents extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            code: String,
            name: String,
            subContents: SubContents,
            discipline: Discipline,
            series: CerneDegree,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'code', nullable: true })
    @ApiProperty({ required: false })
    code: string;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @OneToMany(() => SubContents, (other) => other.content)
    subContents: SubContents[];

    @ManyToOne(() => Discipline, (other) => other.contents)
    discipline: Discipline;

    @ManyToOne(() => CerneDegree)
    series: CerneDegree;

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

export default Contents;
