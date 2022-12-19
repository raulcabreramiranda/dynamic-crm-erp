/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamDTO } from '../../exam/_base/exam.dto';
import { StudentExamDTO } from '../../student-exam/_base/student-exam.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';
import { ExamCardDTO } from '../../exam-card/_base/exam-card.dto';

/**
 * A ExamCardRead DTO object.
 */
export class ExamCardReadDTO extends BaseDTO {
    @ApiProperty({ description: 'file field', required: false })
    file: string;

    @ApiProperty({ description: 'readedFile field', required: false })
    readedFile: string;

    @ApiProperty({ description: 'template field', required: false })
    template: string;

    @ApiProperty({ description: 'answers field', required: false })
    answers: string;

    @ApiProperty({ description: 'readedResponses field', required: false })
    readedResponses: string;

    @ApiProperty({ description: 'columnsAnswers field', required: false })
    columnsAnswers: string;

    @ApiProperty({ description: 'discursive field', required: false })
    discursive: string;

    @ApiProperty({ description: 'reading field', required: false })
    reading: string;

    @ApiProperty({ description: 'readingTP field', required: false })
    readingTP: string;

    @ApiProperty({ description: 'fileOriginal field', required: false })
    fileOriginal: string;

    @ApiProperty({ type: ExamDTO, description: 'exam relationship' })
    exam: ExamDTO;

    @ApiProperty({ type: StudentExamDTO, isArray: true, description: 'studentExam relationship' })
    studentExam: StudentExamDTO[];

    @ApiProperty({ type: AdminUserDTO, description: 'student relationship' })
    student: AdminUserDTO;

    @ApiProperty({ type: ExamCardDTO, description: 'examCard relationship' })
    examCard: ExamCardDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
