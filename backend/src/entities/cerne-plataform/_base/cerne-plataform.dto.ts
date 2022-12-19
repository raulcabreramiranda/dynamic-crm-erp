/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { CernePlataformUserDTO } from '../../cerne-plataform-user/_base/cerne-plataform-user.dto';

/**
 * A CernePlataform DTO object.
 */
export class CernePlataformDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'link field', required: false })
    link: string;

    @ApiProperty({ description: 'assessmentModelId field', required: false })
    assessmentModelId: number;

    @ApiProperty({ description: 'api field', required: false })
    api: string;

    @ApiProperty({ description: 'token field', required: false })
    token: string;

    @ApiProperty({ description: 'domain field', required: false })
    domain: string;

    @ApiProperty({ description: 'clientId field', required: false })
    clientId: number;

    @ApiProperty({ description: 'clientName field', required: false })
    clientName: string;

    @ApiProperty({ description: 'clientPrimaryColor field', required: false })
    clientPrimaryColor: string;

    @ApiProperty({ description: 'clientSecondaryColor field', required: false })
    clientSecondaryColor: string;

    @ApiProperty({ description: 'clientImage field', required: false })
    clientImage: string;

    @ApiProperty({ description: 'clientImageHeader field', required: false })
    clientImageHeader: string;

    @ApiProperty({ description: 'clientImageFooter field', required: false })
    clientImageFooter: string;

    @ApiProperty({ type: CernePlataformUserDTO, isArray: true, description: 'cernePlataformUser relationship' })
    cernePlataformUser: CernePlataformUserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
