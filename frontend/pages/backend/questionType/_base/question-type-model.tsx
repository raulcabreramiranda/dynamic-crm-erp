import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionType {
    id?: number;
    name?: string;
    description?: string;
    difficulty?: number;
    discrimination?: number;
    pseudoGuessing?: number;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionType> = {
    id: 0,
};

export default () => <div />;
