/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { SystemEvaluation } from '../../../entities/o-l-d-cerne-school/_base/system-evaluation.enum';

/**
 * A OLDCerneSchool DTO object.
 */
export class OLDCerneSchoolDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ enum: SystemEvaluation, description: 'systemEvaluation enum field', required: false })
    systemEvaluation: SystemEvaluation;

    @ApiProperty({ description: 'deliveryProof field', required: false })
    deliveryProof: number;

    @ApiProperty({ description: 'printingProof field', required: false })
    printingProof: number;

    @ApiProperty({ description: 'uploadReplyCard field', required: false })
    uploadReplyCard: number;

    @ApiProperty({ description: 'date field', required: false })
    date: Date;

    @ApiProperty({ description: 'image field', required: false })
    image: string;

    @ApiProperty({ description: 'correctionEssayQuestions field', required: false })
    correctionEssayQuestions: number;

    @ApiProperty({ description: 'releaseResults field', required: false })
    releaseResults: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
