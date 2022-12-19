/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { TrainingEnvironmentComponent } from '../../training-environment-component/_base/training-environment-component.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['TrainingEnvironment'] ?? 'TrainingEnvironment')
export class TrainingEnvironment extends BaseEntity {
    static columnsMetaData() {
        return {
            description: String,
            title: String,
            hour: String,
            trainingEnvironmentComponent: TrainingEnvironmentComponent,
        };
    }

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ name: 'title', nullable: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ name: 'hour', nullable: true })
    @ApiProperty({ required: false })
    hour: string;

    @OneToMany(() => TrainingEnvironmentComponent, (other) => other.trainingEnvironment)
    trainingEnvironmentComponent: TrainingEnvironmentComponent[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default TrainingEnvironment;
