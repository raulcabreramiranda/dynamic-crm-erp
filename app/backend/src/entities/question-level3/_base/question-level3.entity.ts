/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ContentsMasterTeacher } from '../../contents-master-teacher/_base/contents-master-teacher.entity';
import { QuestionLevel2 } from '../../question-level2/_base/question-level2.entity';
import { QuestionLevel4 } from '../../question-level4/_base/question-level4.entity';
import { QuestionLevels } from '../../question-levels/_base/question-levels.entity';
import { ExamTemplate } from '../../exam-template/_base/exam-template.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionLevel3'] ?? 'QuestionLevel3')
export class QuestionLevel3 extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            description: String,
            externalCode: Number,
            enemincidenceparameter: Number,
            enemIncidencePercent: Number,
            contentsMasterTeacher: ContentsMasterTeacher,
            level2: QuestionLevel2,
            level4: QuestionLevel4,
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

    @Column({ type: 'float', name: 'enemincidenceparameter', nullable: true })
    @ApiProperty({ required: false })
    enemincidenceparameter: number;

    @Column({ type: 'integer', name: 'enemIncidencePercent', nullable: true })
    @ApiProperty({ required: false })
    enemIncidencePercent: number;

    @OneToMany(() => ContentsMasterTeacher, (other) => other.subContent)
    contentsMasterTeacher: ContentsMasterTeacher[];

    @ManyToOne(() => QuestionLevel2, (other) => other.level3)
    level2: QuestionLevel2;

    @OneToMany(() => QuestionLevel4, (other) => other.level3)
    level4: QuestionLevel4[];

    @OneToMany(() => QuestionLevels, (other) => other.level3)
    questionLevels: QuestionLevels[];

    @OneToMany(() => ExamTemplate, (other) => other.subConteudoLevel3)
    examTemplate: ExamTemplate[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionLevel3;
