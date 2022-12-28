/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { TrainingEnvironmentDTO } from '../../training-environment/_base/training-environment.dto';
import { TrainingEnvironmentContentDTO } from '../../training-environment-content/_base/training-environment-content.dto';

/**
 * A TrainingEnvironmentComponent DTO object.
 */
export class TrainingEnvironmentComponentDTO extends BaseDTO {
    @ApiProperty({ description: 'title field', required: false })
    title: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'hour field', required: false })
    hour: string;

    @ApiProperty({ type: TrainingEnvironmentDTO, description: 'trainingEnvironment relationship' })
    trainingEnvironment: TrainingEnvironmentDTO;

    @ApiProperty({ type: TrainingEnvironmentContentDTO, isArray: true, description: 'trainingEnvironmentContent relationship' })
    trainingEnvironmentContent: TrainingEnvironmentContentDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
