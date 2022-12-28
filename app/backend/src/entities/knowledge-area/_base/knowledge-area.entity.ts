/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ExamsMasterKnowledgeArea } from '../../exams-master-knowledge-area/_base/exams-master-knowledge-area.entity';
import { Discipline } from '../../discipline/_base/discipline.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['KnowledgeArea'] ?? 'KnowledgeArea')
export class KnowledgeArea extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            sigla: String,
            examsMasterKnowledgeArea: ExamsMasterKnowledgeArea,
            disciplines: Discipline,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'sigla', nullable: true })
    @ApiProperty({ required: false })
    sigla: string;

    @OneToMany(() => ExamsMasterKnowledgeArea, (other) => other.knowledgeArea)
    examsMasterKnowledgeArea: ExamsMasterKnowledgeArea[];

    @ManyToMany(() => Discipline)
    @JoinTable({
        name: 'DisciplinesKnowledgeArea',
        joinColumn: { name: 'knowledgeAreaId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'disciplineId', referencedColumnName: 'id' },
    })
    disciplines: Discipline[];

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

export default KnowledgeArea;
