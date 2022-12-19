/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Matrix } from '../../matrix/_base/matrix.entity';
import { SkillItem } from '../../skill-item/_base/skill-item.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['Skill'] ?? 'Skill')
export class Skill extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            sigla: String,
            name: String,
            description: String,
            areaCompetence: Number,
            color: String,
            matrix: Matrix,
            skillItems: SkillItem,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'sigla', nullable: true })
    @ApiProperty({ required: false })
    sigla: string;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ type: 'integer', name: 'areaCompetence', nullable: true })
    @ApiProperty({ required: false })
    areaCompetence: number;

    @Column({ name: 'color', nullable: true })
    @ApiProperty({ required: false })
    color: string;

    @ManyToOne(() => Matrix, (other) => other.skills)
    matrix: Matrix;

    @OneToMany(() => SkillItem, (other) => other.skill)
    skillItems: SkillItem[];

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

export default Skill;
