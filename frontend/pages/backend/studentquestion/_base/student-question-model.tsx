import { IStudentExam } from '../../../backend/studentexam/_base/student-exam-model';
import { IExamTemplate } from '../../../backend/teststemplates/_base/exam-template-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IStudentQuestion {
    id?: number;
    scoreQuestion?: number;
    questionScoreAnnulment?: number;
    questionAnswer?: string;
    teacherComment?: any;
    questionAnswerDiscursive?: any;
    date?: string;
    studentExam?: IStudentExam;
    examTemplate?: IExamTemplate;
    teacher?: IAdminUser[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IStudentQuestion> = {
    id: 0,
};

export default () => <div />;
