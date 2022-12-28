/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionLevel1 } from '../../question-level1/_base/question-level1.entity';
import { QuestionLevel3 } from '../../question-level3/_base/question-level3.entity';
import { QuestionLevels } from '../../question-levels/_base/question-levels.entity';
import { ExamTemplate } from '../../exam-template/_base/exam-template.entity';
import { TypeSource } from './type-source.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionLevel2'] ?? 'QuestionLevel2')
export class QuestionLevel2 extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            description: String,
            externalCode: Number,
            typeSource: TypeSource,
            level1: QuestionLevel1,
            level3: QuestionLevel3,
            questionLevels: QuestionLevels,
            examTemplate: ExamTemplate,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ type: 'integer', name: 'externalCode', nullable: true })
    @ApiProperty({ required: false })
    externalCode: number;

    @Column({ type: 'simple-enum', name: 'typeSource', enum: TypeSource, nullable: true })
    @ApiProperty({ required: false })
    typeSource: TypeSource;

    @ManyToOne(() => QuestionLevel1, (other) => other.level2)
    level1: QuestionLevel1;

    @OneToMany(() => QuestionLevel3, (other) => other.level2)
    level3: QuestionLevel3[];

    @OneToMany(() => QuestionLevels, (other) => other.level2)
    questionLevels: QuestionLevels[];

    @OneToMany(() => ExamTemplate, (other) => other.conteudoLevel2)
    examTemplate: ExamTemplate[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionLevel2;
