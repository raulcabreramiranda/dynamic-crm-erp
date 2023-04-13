/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminPermissionProfileDTO } from '../../admin-permission-profile/_base/admin-permission-profile.dto';
import { AdminPermissionUserDTO } from '../../admin-permission-user/_base/admin-permission-user.dto';
import { AdminPermissionSession } from '../../../entities/admin-permission/_base/admin-permission-session.enum';
import { AdminPermissionMethod } from '../../../entities/admin-permission/_base/admin-permission-method.enum';

/**
 * A AdminPermission DTO object.
 */
export class AdminPermissionDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ enum: AdminPermissionSession, description: 'session enum field', required: false })
    session: AdminPermissionSession;

    @ApiProperty({ enum: AdminPermissionMethod, description: 'method enum field', required: false })
    method: AdminPermissionMethod;

    @ApiProperty({ type: AdminPermissionProfileDTO, isArray: true, description: 'adminPermissionProfiles relationship' })
    adminPermissionProfiles: AdminPermissionProfileDTO[];

    @ApiProperty({ type: AdminPermissionUserDTO, isArray: true, description: 'adminPermissionUsers relationship' })
    adminPermissionUsers: AdminPermissionUserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
