/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { TrainingEnvironmentComponentDTO } from '../../training-environment-component/_base/training-environment-component.dto';
import { TypeContent } from './type-content.enum';

/**
 * A TrainingEnvironmentContent DTO object.
 */
export class TrainingEnvironmentContentDTO extends BaseDTO {
    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'title field', required: false })
    title: string;

    @ApiProperty({ description: 'hour field', required: false })
    hour: string;

    @ApiProperty({ description: 'link field', required: false })
    link: string;

    @ApiProperty({ enum: TypeContent, description: 'typeContent enum field', required: false })
    typeContent: TypeContent;

    @ApiProperty({ type: TrainingEnvironmentComponentDTO, description: 'trainingEnvironmentComponent relationship' })
    trainingEnvironmentComponent: TrainingEnvironmentComponentDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
