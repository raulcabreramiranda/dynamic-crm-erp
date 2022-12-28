/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

/**
 * A AdminAuditEntity DTO object.
 */
export class AdminAuditEntityDTO extends BaseDTO {
    @ApiProperty({ description: 'entityId field', required: false })
    entityId: number;

    @ApiProperty({ description: 'entityType field', required: false })
    entityType: string;

    @ApiProperty({ description: 'action field', required: false })
    action: string;

    @ApiProperty({ description: 'entityValue field', required: false })
    entityValue: string;

    @ApiProperty({ description: 'entityKeyDiff field', required: false })
    entityKeyDiff: string;

    @ApiProperty({ description: 'commitVersion field', required: false })
    commitVersion: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
