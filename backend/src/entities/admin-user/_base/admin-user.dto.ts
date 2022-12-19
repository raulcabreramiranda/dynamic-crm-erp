/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { StudentQuestionDTO } from '../../student-question/_base/student-question.dto';
import { StudentExamDTO } from '../../student-exam/_base/student-exam.dto';
import { ExamCardReadDTO } from '../../exam-card-read/_base/exam-card-read.dto';
import { MasterTeacherDTO } from '../../master-teacher/_base/master-teacher.dto';
import { CernePlataformUserDTO } from '../../cerne-plataform-user/_base/cerne-plataform-user.dto';
import { AdminProfileDTO } from '../../admin-profile/_base/admin-profile.dto';
import { AdminUserSuperProDTO } from '../../admin-user-super-pro/_base/admin-user-super-pro.dto';
import { AdminPermissionUserDTO } from '../../admin-permission-user/_base/admin-permission-user.dto';
import { AdminWhiteLabelDTO } from '../../admin-white-label/_base/admin-white-label.dto';
import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { EssayDTO } from '../../essay/_base/essay.dto';
import { EssayResultDTO } from '../../essay-result/_base/essay-result.dto';
import { ConfigureCorrectionReviewerDTO } from '../../configure-correction-reviewer/_base/configure-correction-reviewer.dto';
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

    @ApiProperty({ type: StudentQuestionDTO, description: 'studentQuestion relationship' })
    studentQuestion: StudentQuestionDTO;

    @ApiProperty({ type: StudentExamDTO, isArray: true, description: 'studentExam relationship' })
    studentExam: StudentExamDTO[];

    @ApiProperty({ type: ExamCardReadDTO, isArray: true, description: 'examCardRead relationship' })
    examCardRead: ExamCardReadDTO[];

    @ApiProperty({ type: MasterTeacherDTO, isArray: true, description: 'masterTeacher relationship' })
    masterTeacher: MasterTeacherDTO[];

    @ApiProperty({ type: CernePlataformUserDTO, isArray: true, description: 'cernePlataformUser relationship' })
    cernePlataformUser: CernePlataformUserDTO[];

    @ApiProperty({ type: AdminProfileDTO, description: 'adminProfile relationship' })
    adminProfile: AdminProfileDTO;

    @ApiProperty({ type: AdminUserSuperProDTO, description: 'adminUserSuperPro relationship' })
    adminUserSuperPro: AdminUserSuperProDTO;

    @ApiProperty({ type: AdminPermissionUserDTO, isArray: true, description: 'adminPermissionUsers relationship' })
    adminPermissionUsers: AdminPermissionUserDTO[];

    @ApiProperty({ type: AdminWhiteLabelDTO, description: 'adminWhiteLabel relationship' })
    adminWhiteLabel: AdminWhiteLabelDTO;

    @ApiProperty({ type: CerneClassDTO, description: 'cerneClass relationship' })
    cerneClass: CerneClassDTO;

    @ApiProperty({ type: EssayDTO, isArray: true, description: 'essays relationship' })
    essays: EssayDTO[];

    @ApiProperty({ type: EssayResultDTO, isArray: true, description: 'essayResults relationship' })
    essayResults: EssayResultDTO[];

    @ApiProperty({ type: ConfigureCorrectionReviewerDTO, isArray: true, description: 'configureCorrectionReviewers relationship' })
    configureCorrectionReviewers: ConfigureCorrectionReviewerDTO[];

    @ApiProperty({ type: EssayDTO, isArray: true, description: 'reviewEssays relationship' })
    reviewEssays: EssayDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
