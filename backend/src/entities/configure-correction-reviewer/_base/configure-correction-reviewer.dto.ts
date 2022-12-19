/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ConfigureCorrectionDTO } from '../../configure-correction/_base/configure-correction.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';

/**
 * A ConfigureCorrectionReviewer DTO object.
 */
export class ConfigureCorrectionReviewerDTO extends BaseDTO {
    @ApiProperty({ description: 'percent field', required: false })
    percent: number;

    @ApiProperty({ type: ConfigureCorrectionDTO, description: 'configureCorrection relationship' })
    configureCorrection: ConfigureCorrectionDTO;

    @ApiProperty({ type: AdminUserDTO, description: 'user relationship' })
    user: AdminUserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
