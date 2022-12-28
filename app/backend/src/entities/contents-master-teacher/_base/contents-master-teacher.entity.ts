/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionLevel3 } from '../../question-level3/_base/question-level3.entity';
import { ExamsMasterKnowledgeArea } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ContentsMasterTeacher'] ?? 'ContentsMasterTeacher')
export class ContentsMasterTeacher extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            active: Boolean,
            subContent: QuestionLevel3,
            examsMasterKnowledgeArea: ExamsMasterKnowledgeArea,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'active', nullable: true })
    @ApiProperty({ required: false })
    active: boolean;

    @ManyToOne(() => QuestionLevel3)
    subContent: QuestionLevel3;

    @ManyToOne(() => ExamsMasterKnowledgeArea)
    examsMasterKnowledgeArea: ExamsMasterKnowledgeArea;

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

export default ContentsMasterTeacher;
