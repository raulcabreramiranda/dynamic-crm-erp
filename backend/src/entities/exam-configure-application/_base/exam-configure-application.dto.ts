/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamDTO } from '../../exam/_base/exam.dto';
import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { ProductionType } from '../../../entities/exam-configure-application/_base/production-type.enum';

/**
 * A ExamConfigureApplication DTO object.
 */
export class ExamConfigureApplicationDTO extends BaseDTO {
    @ApiProperty({ description: 'dateInitial field', required: false })
    dateInitial: Date;

    @ApiProperty({ description: 'dateFinal field', required: false })
    dateFinal: Date;

    @ApiProperty({ enum: ProductionType, description: 'productionType enum field', required: false })
    productionType: ProductionType;

    @ApiProperty({ description: 'mixingQuestions field', required: false })
    mixingQuestions: boolean;

    @ApiProperty({ description: 'supervise field', required: false })
    supervise: boolean;

    @ApiProperty({ description: 'limitTime field', required: false })
    limitTime: number;

    @ApiProperty({ description: 'scheduleReleaseResults field', required: false })
    scheduleReleaseResults: Date;

    @ApiProperty({ type: ExamDTO, description: 'exam relationship' })
    exam: ExamDTO;

    @ApiProperty({ type: CerneClassDTO, description: 'cerneClass relationship' })
    cerneClass: CerneClassDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
