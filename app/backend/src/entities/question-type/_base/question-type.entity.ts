/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionType'] ?? 'QuestionType')
export class QuestionType extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            description: String,
            difficulty: Number,
            discrimination: Number,
            pseudoGuessing: Number,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ type: 'float', name: 'difficulty', nullable: true })
    @ApiProperty({ required: false })
    difficulty: number;

    @Column({ type: 'float', name: 'discrimination', nullable: true })
    @ApiProperty({ required: false })
    discrimination: number;

    @Column({ type: 'float', name: 'pseudoGuessing', nullable: true })
    @ApiProperty({ required: false })
    pseudoGuessing: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionType;
