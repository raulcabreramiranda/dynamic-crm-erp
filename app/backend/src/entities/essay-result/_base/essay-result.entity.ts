/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { AdminUser } from '../../admin-user/_base/admin-user.entity';
import { Essay } from '../../essay/_base/essay.entity';
import { SkillItem } from '../../skill-item/_base/skill-item.entity';
import { EssayResultComment } from '../../essay-result-comment/_base/essay-result-comment.entity';
import { MatrixAnnulmentReason } from '../../matrix-annulment-reason/_base/matrix-annulment-reason.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['EssayResult'] ?? 'EssayResult')
export class EssayResult extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            bloqued: Boolean,
            dateInitial: Date,
            dateFinal: Date,
            delivered: Boolean,
            isPreReview: Boolean,
            scoreFinal: Number,
            finalComment: String,
            reviewer: AdminUser,
            essay: Essay,
            skillItem: SkillItem,
            essayResultComment: EssayResultComment,
            skillItemFinal: SkillItem,
            matrixAnnulmentReason: MatrixAnnulmentReason,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'bloqued', nullable: true })
    @ApiProperty({ required: false })
    bloqued: boolean;

    @Column({ type: 'datetime', name: 'dateInitial', nullable: true })
    @ApiProperty({ required: false })
    dateInitial: Date;

    @Column({ type: 'datetime', name: 'dateFinal', nullable: true })
    @ApiProperty({ required: false })
    dateFinal: Date;

    @Column({ name: 'delivered', nullable: true })
    @ApiProperty({ required: false })
    delivered: boolean;

    @Column({ name: 'isPreReview', nullable: true })
    @ApiProperty({ required: false })
    isPreReview: boolean;

    @Column({ type: 'integer', name: 'scoreFinal', nullable: true })
    @ApiProperty({ required: false })
    scoreFinal: number;

    @Column({ type: 'text', name: 'finalComment', nullable: true })
    @ApiProperty({ required: false })
    finalComment: string;

    @ManyToOne(() => AdminUser, (other) => other.essayResults)
    reviewer: AdminUser;

    @ManyToOne(() => Essay, (other) => other.essayResults)
    essay: Essay;

    @ManyToOne(() => SkillItem, (other) => other.essayResults)
    skillItem: SkillItem;

    @OneToMany(() => EssayResultComment, (other) => other.essayResult)
    essayResultComment: EssayResultComment[];

    @ManyToOne(() => SkillItem, (other) => other.essayResultsFinal)
    skillItemFinal: SkillItem;

    @ManyToOne(() => MatrixAnnulmentReason)
    matrixAnnulmentReason: MatrixAnnulmentReason;

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

export default EssayResult;
