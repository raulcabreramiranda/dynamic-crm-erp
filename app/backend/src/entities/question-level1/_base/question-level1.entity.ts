/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionMatrix } from '../../question-matrix/_base/question-matrix.entity';
import { QuestionLevel2 } from '../../question-level2/_base/question-level2.entity';
import { QuestionLevels } from '../../question-levels/_base/question-levels.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionLevel1'] ?? 'QuestionLevel1')
export class QuestionLevel1 extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            description: String,
            type: Number,
            externalCode: Number,
            shortName: String,
            matrix: QuestionMatrix,
            level2: QuestionLevel2,
            questionLevels: QuestionLevels,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ type: 'integer', name: 'type', nullable: true })
    @ApiProperty({ required: false })
    type: number;

    @Column({ type: 'integer', name: 'externalCode', nullable: true })
    @ApiProperty({ required: false })
    externalCode: number;

    @Column({ name: 'shortName', nullable: true })
    @ApiProperty({ required: false })
    shortName: string;

    @ManyToOne(() => QuestionMatrix, (other) => other.level1)
    matrix: QuestionMatrix;

    @OneToMany(() => QuestionLevel2, (other) => other.level1)
    level2: QuestionLevel2[];

    @OneToMany(() => QuestionLevels, (other) => other.level1)
    questionLevels: QuestionLevels[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionLevel1;
