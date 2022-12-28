/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamConfigureApplicationDTO } from '../../exam-configure-application/_base/exam-configure-application.dto';
import { StudentExamDTO } from '../../student-exam/_base/student-exam.dto';
import { ExamCardReadDTO } from '../../exam-card-read/_base/exam-card-read.dto';
import { ExamsMasterDTO } from '../../exams-master/_base/exams-master.dto';
import { DisciplineDTO } from '../../discipline/_base/discipline.dto';
import { ExamTemplateDTO } from '../../exam-template/_base/exam-template.dto';
import { ExamTypeDTO } from '../../exam-type/_base/exam-type.dto';
import { CerneDegreeDTO } from '../../cerne-degree/_base/cerne-degree.dto';

/**
 * A Exam DTO object.
 */
export class ExamDTO extends BaseDTO {
    @ApiProperty({ description: 'year field', required: false })
    year: number;

    @ApiProperty({ description: 'company field', required: false })
    company: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'hasForeignLanguage field', required: false })
    hasForeignLanguage: boolean;

    @ApiProperty({ description: 'emailWord field', required: false })
    emailWord: string;

    @ApiProperty({ description: 'typeIdTest field', required: false })
    typeIdTest: number;

    @ApiProperty({ description: 'dayApplication field', required: false })
    dayApplication: number;

    @ApiProperty({ description: 'superProId field', required: false })
    superProId: number;

    @ApiProperty({ description: 'examData field', required: false })
    examData: string;

    @ApiProperty({ description: 'instructions field', required: false })
    instructions: string;

    @ApiProperty({ description: 'systemEvaluation field', required: false })
    systemEvaluation: string;

    @ApiProperty({ description: 'urlS3 field', required: false })
    urlS3: string;

    @ApiProperty({ type: ExamConfigureApplicationDTO, isArray: true, description: 'examConfigureApplication relationship' })
    examConfigureApplication: ExamConfigureApplicationDTO[];

    @ApiProperty({ type: StudentExamDTO, isArray: true, description: 'studentExam relationship' })
    studentExam: StudentExamDTO[];

    @ApiProperty({ type: ExamCardReadDTO, isArray: true, description: 'examCardRead relationship' })
    examCardRead: ExamCardReadDTO[];

    @ApiProperty({ type: ExamsMasterDTO, isArray: true, description: 'examsMaster relationship' })
    examsMaster: ExamsMasterDTO[];

    @ApiProperty({ type: DisciplineDTO, description: 'discipline relationship' })
    discipline: DisciplineDTO;

    @ApiProperty({ type: ExamTemplateDTO, isArray: true, description: 'examTemplate relationship' })
    examTemplate: ExamTemplateDTO[];

    @ApiProperty({ type: ExamTypeDTO, description: 'examType relationship' })
    examType: ExamTypeDTO;

    @ApiProperty({ type: CerneDegreeDTO, description: 'cerneDegree relationship' })
    cerneDegree: CerneDegreeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
