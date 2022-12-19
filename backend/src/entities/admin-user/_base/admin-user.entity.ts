/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { StudentQuestion } from '../../student-question/_base/student-question.entity';
import { StudentExam } from '../../student-exam/_base/student-exam.entity';
import { ExamCardRead } from '../../exam-card-read/_base/exam-card-read.entity';
import { MasterTeacher } from '../../master-teacher/_base/master-teacher.entity';
import { CernePlataformUser } from '../../cerne-plataform-user/_base/cerne-plataform-user.entity';
import { AdminProfile } from '../../admin-profile/_base/admin-profile.entity';
import { AdminUserSuperPro } from '../../admin-user-super-pro/_base/admin-user-super-pro.entity';
import { AdminPermissionUser } from '../../admin-permission-user/_base/admin-permission-user.entity';
import { AdminWhiteLabel } from '../../admin-white-label/_base/admin-white-label.entity';
import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { Essay } from '../../essay/_base/essay.entity';
import { EssayResult } from '../../essay-result/_base/essay-result.entity';
import { ConfigureCorrectionReviewer } from '../../configure-correction-reviewer/_base/configure-correction-reviewer.entity';
import { UserType } from './user-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['AdminUser'] ?? 'AdminUser')
export class AdminUser extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            login: String,
            fullname: String,
            cellphone: String,
            phone: String,
            email: String,
            activated: Boolean,
            langKey: String,
            password: String,
            imageUrl: String,
            imageUrlContentType: String,
            resetDate: String,
            re: String,
            ra: String,
            userType: UserType,
            clientId: Number,
            studentQuestion: StudentQuestion,
            studentExam: StudentExam,
            examCardRead: ExamCardRead,
            masterTeacher: MasterTeacher,
            cernePlataformUser: CernePlataformUser,
            adminProfile: AdminProfile,
            adminUserSuperPro: AdminUserSuperPro,
            adminPermissionUsers: AdminPermissionUser,
            adminWhiteLabel: AdminWhiteLabel,
            cerneClass: CerneClass,
            essays: Essay,
            essayResults: EssayResult,
            configureCorrectionReviewers: ConfigureCorrectionReviewer,
            reviewEssays: Essay,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'login', nullable: true })
    @ApiProperty({ required: false })
    login: string;

    @Column({ name: 'fullname', nullable: true })
    @ApiProperty({ required: false })
    fullname: string;

    @Column({ name: 'cellphone', nullable: true })
    @ApiProperty({ required: false })
    cellphone: string;

    @Column({ name: 'phone', nullable: true })
    @ApiProperty({ required: false })
    phone: string;

    @Column({ name: 'email', nullable: true })
    @ApiProperty({ required: false })
    email: string;

    @Column({ name: 'activated', nullable: true })
    @ApiProperty({ required: false })
    activated: boolean;

    @Column({ name: 'langKey', nullable: true })
    @ApiProperty({ required: false })
    langKey: string;

    @Column({ name: 'password', nullable: true })
    @ApiProperty({ required: false })
    password: string;

    @Column({ type: 'text', name: 'imageUrl', nullable: true })
    @ApiProperty({ required: false })
    imageUrl: string;

    @Column({ name: 'imageUrlContentType', nullable: true })
    @ApiProperty({ required: false })
    imageUrlContentType: string;

    @Column({ name: 'resetDate', nullable: true })
    @ApiProperty({ required: false })
    resetDate: string;

    @Column({ name: 're', nullable: true })
    @ApiProperty({ required: false })
    re: string;

    @Column({ name: 'ra', nullable: true })
    @ApiProperty({ required: false })
    ra: string;

    @Column({ type: 'simple-enum', name: 'userType', enum: UserType, nullable: true })
    @ApiProperty({ required: false })
    userType: UserType;

    @Column({ type: 'integer', name: 'clientId', nullable: true })
    @ApiProperty({ required: false })
    clientId: number;

    @ManyToOne(() => StudentQuestion, (other) => other.teacher)
    studentQuestion: StudentQuestion;

    @OneToMany(() => StudentExam, (other) => other.student)
    studentExam: StudentExam[];

    @OneToMany(() => ExamCardRead, (other) => other.student)
    examCardRead: ExamCardRead[];

    @OneToMany(() => MasterTeacher, (other) => other.teacher)
    masterTeacher: MasterTeacher[];

    @OneToMany(() => CernePlataformUser, (other) => other.user)
    cernePlataformUser: CernePlataformUser[];

    @ManyToOne(() => AdminProfile, (other) => other.adminUsers)
    adminProfile: AdminProfile;

    @OneToOne(() => AdminUserSuperPro)
    adminUserSuperPro: AdminUserSuperPro;

    @OneToMany(() => AdminPermissionUser, (other) => other.adminUser)
    adminPermissionUsers: AdminPermissionUser[];

    @ManyToOne(() => AdminWhiteLabel, (other) => other.adminUsers)
    adminWhiteLabel: AdminWhiteLabel;

    @ManyToOne(() => CerneClass, (other) => other.adminUsers)
    cerneClass: CerneClass;

    @OneToMany(() => Essay, (other) => other.user)
    essays: Essay[];

    @OneToMany(() => EssayResult, (other) => other.reviewer)
    essayResults: EssayResult[];

    @OneToMany(() => ConfigureCorrectionReviewer, (other) => other.user)
    configureCorrectionReviewers: ConfigureCorrectionReviewer[];

    @OneToMany(() => Essay, (other) => other.reviewUser)
    reviewEssays: Essay[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    @Column({ name: 'createdBy', nullable: true })
    @ApiProperty({ required: false })
    createdBy?: Number;

    @Column({ name: 'createdDate', type: 'datetime', nullable: true })
    @ApiProperty({ required: false })
    createdDate?: Date;

    @Column({ name: 'lastModifiedBy', nullable: true })
    @ApiProperty({ required: false })
    lastModifiedBy?: Number;

    @Column({ name: 'lastModifiedDate', type: 'datetime', nullable: true })
    @ApiProperty({ required: false })
    lastModifiedDate?: Date;
}

export default AdminUser;
