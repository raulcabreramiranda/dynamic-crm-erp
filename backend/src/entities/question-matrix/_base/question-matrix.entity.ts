/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionLevel1 } from '../../question-level1/_base/question-level1.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionMatrix'] ?? 'QuestionMatrix')
export class QuestionMatrix extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            description: String,
            Level1name: String,
            Level2name: String,
            Level3name: String,
            Level4name: String,
            clientId: Number,
            schoolId: Number,
            level1: QuestionLevel1,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ name: 'Level1name', nullable: true })
    @ApiProperty({ required: false })
    Level1name: string;

    @Column({ name: 'Level2name', nullable: true })
    @ApiProperty({ required: false })
    Level2name: string;

    @Column({ name: 'Level3name', nullable: true })
    @ApiProperty({ required: false })
    Level3name: string;

    @Column({ name: 'Level4name', nullable: true })
    @ApiProperty({ required: false })
    Level4name: string;

    @Column({ type: 'integer', name: 'clientId', nullable: true })
    @ApiProperty({ required: false })
    clientId: number;

    @Column({ type: 'integer', name: 'schoolId', nullable: true })
    @ApiProperty({ required: false })
    schoolId: number;

    @OneToMany(() => QuestionLevel1, (other) => other.matrix)
    level1: QuestionLevel1[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionMatrix;
