/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Question } from '../../question/_base/question.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['QuestionText'] ?? 'QuestionText')
export class QuestionText extends BaseEntity {
    static columnsMetaData() {
        return {
            position: Number,
            text: String,
            imgText: String,
            question: Question,
        };
    }

    @Column({ type: 'integer', name: 'position', nullable: true })
    @ApiProperty({ required: false })
    position: number;

    @Column({ name: 'text', nullable: true })
    @ApiProperty({ required: false })
    text: string;

    @Column({ name: 'imgText', nullable: true })
    @ApiProperty({ required: false })
    imgText: string;

    @ManyToOne(() => Question, (other) => other.questionText)
    question: Question;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default QuestionText;
