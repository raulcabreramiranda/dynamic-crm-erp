import { IExam } from '../../../backend/exam/_base/exam-model';
import { IStudentExam } from '../../../backend/studentexam/_base/student-exam-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { IExamCard } from '../../../backend/cartaodaprova/_base/exam-card-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExamCardRead {
    id?: number;
    file?: any;
    readedFile?: string;
    template?: string;
    answers?: string;
    readedResponses?: string;
    columnsAnswers?: any;
    discursive?: any;
    reading?: any;
    readingTP?: string;
    fileOriginal?: string;
    exam?: IExam;
    studentExam?: IStudentExam[];
    student?: IAdminUser;
    examCard?: IExamCard;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExamCardRead> = {
    id: 0,
};

export default () => <div />;
