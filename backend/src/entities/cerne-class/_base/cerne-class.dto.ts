/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamConfigureApplicationDTO } from '../../exam-configure-application/_base/exam-configure-application.dto';
import { CernePlataformUserDTO } from '../../cerne-plataform-user/_base/cerne-plataform-user.dto';
import { EssayDTO } from '../../essay/_base/essay.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';
import { ConfigureApplicationDTO } from '../../configure-application/_base/configure-application.dto';
import { ConfigureCorrectionDTO } from '../../configure-correction/_base/configure-correction.dto';
import { CerneDegreeDTO } from '../../cerne-degree/_base/cerne-degree.dto';

/**
 * A CerneClass DTO object.
 */
export class CerneClassDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ type: ExamConfigureApplicationDTO, isArray: true, description: 'examConfigureApplication relationship' })
    examConfigureApplication: ExamConfigureApplicationDTO[];

    @ApiProperty({ type: CernePlataformUserDTO, isArray: true, description: 'cernePlataformUser relationship' })
    cernePlataformUser: CernePlataformUserDTO[];

    @ApiProperty({ type: EssayDTO, isArray: true, description: 'essays relationship' })
    essays: EssayDTO[];

    @ApiProperty({ type: AdminUserDTO, isArray: true, description: 'adminUsers relationship' })
    adminUsers: AdminUserDTO[];

    @ApiProperty({ type: ConfigureApplicationDTO, isArray: true, description: 'configureApplications relationship' })
    configureApplications: ConfigureApplicationDTO[];

    @ApiProperty({ type: ConfigureCorrectionDTO, isArray: true, description: 'configureCorrections relationship' })
    configureCorrections: ConfigureCorrectionDTO[];

    @ApiProperty({ type: CerneDegreeDTO, isArray: true, description: 'cerneDegrees relationship' })
    cerneDegrees: CerneDegreeDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
