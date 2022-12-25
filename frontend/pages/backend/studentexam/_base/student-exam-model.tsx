import { ICerneClass } from '../../../backend/class/_base/cerne-class-model';
import { IStudentQuestion } from '../../../backend/studentquestion/_base/student-question-model';
import { IExam } from '../../../backend/exam/_base/exam-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { IExamCardRead } from '../../../backend/leiturascartoesprova/_base/exam-card-read-model';
import { ChoiceForeignLanguage } from '../../../../components/enumerations/choice-foreign-language.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IStudentExam {
    id?: number;
    note?: number;
    answerTemplate?: string;
    delivered?: boolean;
    blocked?: boolean;
    endDate?: string;
    qtExternalConsultations?: number;
    choiceForeignLanguage?: ChoiceForeignLanguage;
    reOpenEndTime?: string;
    cerneClass?: ICerneClass;
    studentQuestion?: IStudentQuestion[];
    exam?: IExam;
    student?: IAdminUser;
    examCardRead?: IExamCardRead;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IStudentExam> = {
    id: 0,
};

export default () => <div />;
