/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { StudentQuestionDTO } from '../../student-question/_base/student-question.dto';
import { ExamDTO } from '../../exam/_base/exam.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';
import { ExamCardReadDTO } from '../../exam-card-read/_base/exam-card-read.dto';
import { ChoiceForeignLanguage } from './choice-foreign-language.enum';

/**
 * A StudentExam DTO object.
 */
export class StudentExamDTO extends BaseDTO {
    @ApiProperty({ description: 'note field', required: false })
    note: number;

    @ApiProperty({ description: 'answerTemplate field', required: false })
    answerTemplate: string;

    @ApiProperty({ description: 'delivered field', required: false })
    delivered: boolean;

    @ApiProperty({ description: 'blocked field', required: false })
    blocked: boolean;

    @ApiProperty({ description: 'endDate field', required: false })
    endDate: Date;

    @ApiProperty({ description: 'qtExternalConsultations field', required: false })
    qtExternalConsultations: number;

    @ApiProperty({ enum: ChoiceForeignLanguage, description: 'choiceForeignLanguage enum field', required: false })
    choiceForeignLanguage: ChoiceForeignLanguage;

    @ApiProperty({ description: 'reOpenEndTime field', required: false })
    reOpenEndTime: Date;

    @ApiProperty({ type: CerneClassDTO, description: 'cerneClass relationship' })
    cerneClass: CerneClassDTO;

    @ApiProperty({ type: StudentQuestionDTO, isArray: true, description: 'studentQuestion relationship' })
    studentQuestion: StudentQuestionDTO[];

    @ApiProperty({ type: ExamDTO, description: 'exam relationship' })
    exam: ExamDTO;

    @ApiProperty({ type: AdminUserDTO, description: 'student relationship' })
    student: AdminUserDTO;

    @ApiProperty({ type: ExamCardReadDTO, description: 'examCardRead relationship' })
    examCardRead: ExamCardReadDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
