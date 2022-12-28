/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';
import { CernePlataformDTO } from '../../cerne-plataform/_base/cerne-plataform.dto';
import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { CerneDegreeDTO } from '../../cerne-degree/_base/cerne-degree.dto';
import { DisciplineDTO } from '../../discipline/_base/discipline.dto';
import { UserType } from './user-type.enum';

/**
 * A CernePlataformUser DTO object.
 */
export class CernePlataformUserDTO extends BaseDTO {
    @ApiProperty({ description: 'year field', required: false })
    year: number;

    @ApiProperty({ enum: UserType, description: 'userType enum field', required: false })
    userType: UserType;

    @ApiProperty({ type: AdminUserDTO, description: 'user relationship' })
    user: AdminUserDTO;

    @ApiProperty({ type: CernePlataformDTO, description: 'plataform relationship' })
    plataform: CernePlataformDTO;

    @ApiProperty({ type: CerneClassDTO, description: 'class relationship' })
    class: CerneClassDTO;

    @ApiProperty({ type: CerneDegreeDTO, description: 'degree relationship' })
    degree: CerneDegreeDTO;

    @ApiProperty({ type: DisciplineDTO, description: 'discipline relationship' })
    discipline: DisciplineDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
