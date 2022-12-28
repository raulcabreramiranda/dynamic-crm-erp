/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { TrainingEnvironmentComponent } from '../../training-environment-component/_base/training-environment-component.entity';
import { TypeContent } from './type-content.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['TrainingEnvironmentContent'] ?? 'TrainingEnvironmentContent')
export class TrainingEnvironmentContent extends BaseEntity {
    static columnsMetaData() {
        return {
            description: String,
            title: String,
            hour: String,
            link: String,
            typeContent: TypeContent,
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

    @Column({ name: 'link', nullable: true })
    @ApiProperty({ required: false })
    link: string;

    @Column({ type: 'simple-enum', name: 'typeContent', enum: TypeContent, nullable: true })
    @ApiProperty({ required: false })
    typeContent: TypeContent;

    @ManyToOne(() => TrainingEnvironmentComponent, (other) => other.trainingEnvironmentContent)
    trainingEnvironmentComponent: TrainingEnvironmentComponent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default TrainingEnvironmentContent;
