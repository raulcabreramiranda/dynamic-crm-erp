/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Exam } from '../../exam/_base/exam.entity';
import { KnowledgeArea } from '../../knowledge-area/_base/knowledge-area.entity';
import { MasterTeacher } from '../../master-teacher/_base/master-teacher.entity';
import { CernePlataformUser } from '../../cerne-plataform-user/_base/cerne-plataform-user.entity';
import { Contents } from '../../contents/_base/contents.entity';
import { ExamTemplate } from '../../exam-template/_base/exam-template.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['Discipline'] ?? 'Discipline')
export class Discipline extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            code: String,
            name: String,
            sigla: String,
            exam: Exam,
            knowledgeArea: KnowledgeArea,
            masterTeacher: MasterTeacher,
            cernePlataformUser: CernePlataformUser,
            contents: Contents,
            examTemplate: ExamTemplate,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'code', nullable: true })
    @ApiProperty({ required: false })
    code: string;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'sigla', nullable: true })
    @ApiProperty({ required: false })
    sigla: string;

    @OneToMany(() => Exam, (other) => other.discipline)
    exam: Exam[];

    @ManyToMany(() => KnowledgeArea)
    @JoinTable({
        name: 'DisciplinesKnowledgeArea',
    })
    knowledgeArea: KnowledgeArea[];

    @OneToMany(() => MasterTeacher, (other) => other.discipline)
    masterTeacher: MasterTeacher[];

    @OneToMany(() => CernePlataformUser, (other) => other.discipline)
    cernePlataformUser: CernePlataformUser[];

    @OneToMany(() => Contents, (other) => other.discipline)
    contents: Contents[];

    @ManyToOne(() => ExamTemplate, (other) => other.discipline)
    examTemplate: ExamTemplate;

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

export default Discipline;
