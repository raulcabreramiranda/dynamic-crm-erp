/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Question } from '../../question/_base/question.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionAlternative'] ?? 'QuestionAlternative')
export class QuestionAlternative extends BaseEntity {
    static columnsMetaData() {
        return {
            position: Number,
            description: String,
            correct: Boolean,
            rtfLink: String,
            question: Question,
        };
    }

    @Column({ type: 'integer', name: 'position', nullable: true })
    @ApiProperty({ required: false })
    position: number;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ name: 'correct', nullable: true })
    @ApiProperty({ required: false })
    correct: boolean;

    @Column({ name: 'rtfLink', nullable: true })
    @ApiProperty({ required: false })
    rtfLink: string;

    @ManyToOne(() => Question, (other) => other.questionAlternative)
    question: Question;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionAlternative;
