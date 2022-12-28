import { IQuestionLevel1 } from '../../questionLevel1/_base/question-level1-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionMatrix {
    id?: number;
    name?: string;
    description?: string;
    Level1name?: string;
    Level2name?: string;
    Level3name?: string;
    Level4name?: string;
    clientId?: number;
    schoolId?: number;
    level1?: IQuestionLevel1[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionMatrix> = {
    id: 0,
};

export default () => <div />;
