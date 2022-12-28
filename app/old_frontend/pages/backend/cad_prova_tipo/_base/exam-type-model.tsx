import { IExam } from '../../exam/_base/exam-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExamType {
    id?: number;
    name?: string;
    orderShow?: number;
    active?: boolean;
    exam?: IExam[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExamType> = {
    id: 0,
};

export default () => <div />;
