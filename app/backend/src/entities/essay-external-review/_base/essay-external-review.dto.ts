/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayDTO } from '../../essay/_base/essay.dto';

/**
 * A EssayExternalReview DTO object.
 */
export class EssayExternalReviewDTO extends BaseDTO {
    @ApiProperty({ description: 'externalId field', required: false })
    externalId: string;

    @ApiProperty({ description: 'externalReviewId field', required: false })
    externalReviewId: string;

    @ApiProperty({ description: 'essayExternalSendData field', required: false })
    essayExternalSendData: Date;

    @ApiProperty({ description: 'essayExternalCheckData field', required: false })
    essayExternalCheckData: Date;

    @ApiProperty({ description: 'essayExternalReplay field', required: false })
    essayExternalReplay: string;

    @ApiProperty({ description: 'status field', required: false })
    status: string;

    @ApiProperty({ type: EssayDTO, description: 'essay relationship' })
    essay: EssayDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
