import { IQuestion } from '../../question/_base/question-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionText {
    id?: number;
    position?: number;
    text?: string;
    imgText?: string;
    question?: IQuestion;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionText> = {
    id: 0,
};

export default () => <div />;
