/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionLevel3 } from '../../question-level3/_base/question-level3.entity';
import { QuestionLevels } from '../../question-levels/_base/question-levels.entity';
import { ExamTemplate } from '../../exam-template/_base/exam-template.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionLevel4'] ?? 'QuestionLevel4')
export class QuestionLevel4 extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            description: String,
            externalCode: Number,
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

    @ManyToOne(() => QuestionLevel3, (other) => other.level4)
    level3: QuestionLevel3;

    @OneToMany(() => QuestionLevels, (other) => other.level4)
    questionLevels: QuestionLevels[];

    @OneToMany(() => ExamTemplate, (other) => other.itemLevel4)
    examTemplate: ExamTemplate[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionLevel4;
