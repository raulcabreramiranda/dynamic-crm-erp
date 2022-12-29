/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { TypeContent } from '../../../entities/photo/_base/type-content.enum';

/**
 * A Photo DTO object.
 */
export class PhotoDTO extends BaseDTO {
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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
