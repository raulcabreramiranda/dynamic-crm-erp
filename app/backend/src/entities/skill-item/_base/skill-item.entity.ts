/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Skill } from '../../skill/_base/skill.entity';
import { EssayResult } from '../../essay-result/_base/essay-result.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['SkillItem'] ?? 'SkillItem')
export class SkillItem extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            order: Number,
            points: Number,
            correctionFeedback: String,
            correctionSuggestion: String,
            preCorrectionFeedback: String,
            preCorrectionSuggestion: String,
            skill: Skill,
            essayResults: EssayResult,
            essayResultsFinal: EssayResult,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'integer', name: 'order', nullable: true })
    @ApiProperty({ required: false })
    order: number;

    @Column({ type: 'integer', name: 'points', nullable: true })
    @ApiProperty({ required: false })
    points: number;

    @Column({ name: 'correctionFeedback', nullable: true })
    @ApiProperty({ required: false })
    correctionFeedback: string;

    @Column({ type: 'text', name: 'correctionSuggestion', nullable: true })
    @ApiProperty({ required: false })
    correctionSuggestion: string;

    @Column({ name: 'preCorrectionFeedback', nullable: true })
    @ApiProperty({ required: false })
    preCorrectionFeedback: string;

    @Column({ type: 'text', name: 'preCorrectionSuggestion', nullable: true })
    @ApiProperty({ required: false })
    preCorrectionSuggestion: string;

    @ManyToOne(() => Skill, (other) => other.skillItems)
    skill: Skill;

    @OneToMany(() => EssayResult, (other) => other.skillItem)
    essayResults: EssayResult[];

    @OneToMany(() => EssayResult, (other) => other.skillItemFinal)
    essayResultsFinal: EssayResult[];

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

export default SkillItem;
