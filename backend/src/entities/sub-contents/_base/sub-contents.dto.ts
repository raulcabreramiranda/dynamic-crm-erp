/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ContentsDTO } from '../../contents/_base/contents.dto';

/**
 * A SubContents DTO object.
 */
export class SubContentsDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'enemincidenceparameter field', required: false })
    enemincidenceparameter: number;

    @ApiProperty({ description: 'enemIncidencePercent field', required: false })
    enemIncidencePercent: number;

    @ApiProperty({ type: ContentsDTO, description: 'content relationship' })
    content: ContentsDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
