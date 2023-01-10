/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminProfileDTO } from '../../admin-profile/_base/admin-profile.dto';
import { AdminPermissionUserDTO } from '../../admin-permission-user/_base/admin-permission-user.dto';
import { AdminWhiteLabelDTO } from '../../admin-white-label/_base/admin-white-label.dto';
import { UserType } from '../../../entities/admin-user/_base/user-type.enum';

/**
 * A AdminUser DTO object.
 */
export class AdminUserDTO extends BaseDTO {
    @ApiProperty({ description: 'login field', required: false })
    login: string;

    @ApiProperty({ description: 'fullname field', required: false })
    fullname: string;

    @ApiProperty({ description: 'cellphone field', required: false })
    cellphone: string;

    @ApiProperty({ description: 'phone field', required: false })
    phone: string;

    @ApiProperty({ description: 'email field', required: false })
    email: string;

    @ApiProperty({ description: 'activated field', required: false })
    activated: boolean;

    @ApiProperty({ description: 'langKey field', required: false })
    langKey: string;

    @ApiProperty({ description: 'password field', required: false })
    password: string;

    @ApiProperty({ description: 'imageUrl field', required: false })
    imageUrl: string;

    @ApiProperty({ description: 'resetDate field', required: false })
    resetDate: string;

    @ApiProperty({ description: 're field', required: false })
    re: string;

    @ApiProperty({ description: 'ra field', required: false })
    ra: string;

    @ApiProperty({ enum: UserType, description: 'userType enum field', required: false })
    userType: UserType;

    @ApiProperty({ description: 'clientId field', required: false })
    clientId: number;

    @ApiProperty({ type: AdminProfileDTO, description: 'adminProfile relationship' })
    adminProfile: AdminProfileDTO;

    @ApiProperty({ type: AdminPermissionUserDTO, isArray: true, description: 'adminPermissionUsers relationship' })
    adminPermissionUsers: AdminPermissionUserDTO[];

    @ApiProperty({ type: AdminWhiteLabelDTO, description: 'adminWhiteLabel relationship' })
    adminWhiteLabel: AdminWhiteLabelDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
