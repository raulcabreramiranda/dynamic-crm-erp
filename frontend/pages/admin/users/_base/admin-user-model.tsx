import { IStudentQuestion } from '../../../backend/studentquestion/_base/student-question-model';
import { IStudentExam } from '../../../backend/studentexam/_base/student-exam-model';
import { IExamCardRead } from '../../../backend/leiturascartoesprova/_base/exam-card-read-model';
import { IMasterTeacher } from '../../../backend/masterprofessor/_base/master-teacher-model';
import { ICernePlataformUser } from '../../../backend/cerneplataformuser/_base/cerne-plataform-user-model';
import { IAdminProfile } from '../../../admin/profiles/_base/admin-profile-model';
import { IAdminUserSuperPro } from '../../../backend/adminUserSuperPro/_base/admin-user-super-pro-model';
import { IAdminPermissionUser } from '../../../admin/permission-users/_base/admin-permission-user-model';
import { IAdminWhiteLabel } from '../../../admin/white-labels/_base/admin-white-label-model';
import { ICerneClass } from '../../../backend/class/_base/cerne-class-model';
import { IEssay } from '../../../backend/essay/_base/essay-model';
import { IEssayResult } from '../../../backend/essayresult/_base/essay-result-model';
import { IConfigureCorrectionReviewer } from '../../../backend/configurecorrectionreviewer/_base/configure-correction-reviewer-model';
import { UserType } from '../../../../components/enumerations/user-type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IAdminUser {
    id?: number;
    login?: string;
    fullname?: string;
    cellphone?: string;
    phone?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    password?: string;
    imageUrlContentType?: string;
    imageUrlBase64?: string;
    imageUrlFileName?: string;
    imageUrl?: any;
    resetDate?: string;
    re?: string;
    ra?: string;
    userType?: UserType;
    clientId?: number;
    studentQuestion?: IStudentQuestion;
    studentExam?: IStudentExam[];
    examCardRead?: IExamCardRead[];
    masterTeacher?: IMasterTeacher[];
    cernePlataformUser?: ICernePlataformUser[];
    adminProfile?: IAdminProfile;
    adminUserSuperPro?: IAdminUserSuperPro;
    adminPermissionUsers?: IAdminPermissionUser[];
    adminWhiteLabel?: IAdminWhiteLabel;
    cerneClass?: ICerneClass;
    essays?: IEssay[];
    essayResults?: IEssayResult[];
    configureCorrectionReviewers?: IConfigureCorrectionReviewer[];
    reviewEssays?: IEssay[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminUser> = {
    id: 0,
};

export default () => <div />;
