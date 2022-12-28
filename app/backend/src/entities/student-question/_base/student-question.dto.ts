/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { StudentExamDTO } from '../../student-exam/_base/student-exam.dto';
import { ExamTemplateDTO } from '../../exam-template/_base/exam-template.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';

/**
 * A StudentQuestion DTO object.
 */
export class StudentQuestionDTO extends BaseDTO {
    @ApiProperty({ description: 'scoreQuestion field', required: false })
    scoreQuestion: number;

    @ApiProperty({ description: 'questionScoreAnnulment field', required: false })
    questionScoreAnnulment: number;

    @ApiProperty({ description: 'questionAnswer field', required: false })
    questionAnswer: string;

    @ApiProperty({ description: 'teacherComment field', required: false })
    teacherComment: string;

    @ApiProperty({ description: 'questionAnswerDiscursive field', required: false })
    questionAnswerDiscursive: string;

    @ApiProperty({ description: 'date field', required: false })
    date: Date;

    @ApiProperty({ type: StudentExamDTO, description: 'studentExam relationship' })
    studentExam: StudentExamDTO;

    @ApiProperty({ type: ExamTemplateDTO, description: 'examTemplate relationship' })
    examTemplate: ExamTemplateDTO;

    @ApiProperty({ type: AdminUserDTO, isArray: true, description: 'teacher relationship' })
    teacher: AdminUserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
