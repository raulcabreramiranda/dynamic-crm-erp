/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { TrainingEnvironment } from '../../training-environment/_base/training-environment.entity';
import { TrainingEnvironmentContent } from '../../training-environment-content/_base/training-environment-content.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['TrainingEnvironmentComponent'] ?? 'TrainingEnvironmentComponent')
export class TrainingEnvironmentComponent extends BaseEntity {
    static columnsMetaData() {
        return {
            title: String,
            description: String,
            hour: String,
            trainingEnvironment: TrainingEnvironment,
            trainingEnvironmentContent: TrainingEnvironmentContent,
        };
    }

    @Column({ name: 'title', nullable: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ name: 'hour', nullable: true })
    @ApiProperty({ required: false })
    hour: string;

    @ManyToOne(() => TrainingEnvironment, (other) => other.trainingEnvironmentComponent)
    trainingEnvironment: TrainingEnvironment;

    @OneToMany(() => TrainingEnvironmentContent, (other) => other.trainingEnvironmentComponent)
    trainingEnvironmentContent: TrainingEnvironmentContent[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default TrainingEnvironmentComponent;
