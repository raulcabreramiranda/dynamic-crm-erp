/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ContentsDTO } from '../../contents/_base/contents.dto';
import { ExamDTO } from '../../exam/_base/exam.dto';
import { CernePlataformUserDTO } from '../../cerne-plataform-user/_base/cerne-plataform-user.dto';
import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';
import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { ThemeDTO } from '../../theme/_base/theme.dto';

/**
 * A CerneDegree DTO object.
 */
export class CerneDegreeDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'position field', required: false })
    position: number;

    @ApiProperty({ type: ContentsDTO, isArray: true, description: 'contents relationship' })
    contents: ContentsDTO[];

    @ApiProperty({ type: ExamDTO, isArray: true, description: 'exam relationship' })
    exam: ExamDTO[];

    @ApiProperty({ type: CernePlataformUserDTO, isArray: true, description: 'cernePlataformUser relationship' })
    cernePlataformUser: CernePlataformUserDTO[];

    @ApiProperty({ type: JorneyDegreeDTO, isArray: true, description: 'jorneyDegrees relationship' })
    jorneyDegrees: JorneyDegreeDTO[];

    @ApiProperty({ type: CerneClassDTO, isArray: true, description: 'cerneClasses relationship' })
    cerneClasses: CerneClassDTO[];

    @ApiProperty({ type: ThemeDTO, isArray: true, description: 'themes relationship' })
    themes: ThemeDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
