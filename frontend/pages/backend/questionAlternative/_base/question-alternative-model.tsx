import { IQuestion } from '../../../backend/question/_base/question-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionAlternative {
    id?: number;
    position?: number;
    description?: string;
    correct?: boolean;
    rtfLink?: string;
    question?: IQuestion;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionAlternative> = {
    id: 0,
};

export default () => <div />;
