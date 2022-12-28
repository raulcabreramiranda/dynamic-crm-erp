/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Question } from '../../question/_base/question.entity';
import { QuestionLevel1 } from '../../question-level1/_base/question-level1.entity';
import { QuestionLevel2 } from '../../question-level2/_base/question-level2.entity';
import { QuestionLevel3 } from '../../question-level3/_base/question-level3.entity';
import { QuestionLevel4 } from '../../question-level4/_base/question-level4.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionLevels'] ?? 'QuestionLevels')
export class QuestionLevels extends BaseEntity {
    static columnsMetaData() {
        return {
            question: Question,
            level1: QuestionLevel1,
            level2: QuestionLevel2,
            level3: QuestionLevel3,
            level4: QuestionLevel4,
        };
    }

    @ManyToOne(() => Question, (other) => other.questionLevels)
    question: Question;

    @ManyToOne(() => QuestionLevel1, (other) => other.questionLevels)
    level1: QuestionLevel1;

    @ManyToOne(() => QuestionLevel2, (other) => other.questionLevels)
    level2: QuestionLevel2;

    @ManyToOne(() => QuestionLevel3, (other) => other.questionLevels)
    level3: QuestionLevel3;

    @ManyToOne(() => QuestionLevel4, (other) => other.questionLevels)
    level4: QuestionLevel4;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionLevels;
