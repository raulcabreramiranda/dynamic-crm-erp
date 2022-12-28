import { IQuestion } from '../../question/_base/question-model';
import { IQuestionLevel1 } from '../../questionLevel1/_base/question-level1-model';
import { IQuestionLevel2 } from '../../questionLevel2/_base/question-level2-model';
import { IQuestionLevel3 } from '../../questionLevel3/_base/question-level3-model';
import { IQuestionLevel4 } from '../../questionLevel4/_base/question-level4-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionLevels {
    id?: number;
    question?: IQuestion;
    level1?: IQuestionLevel1;
    level2?: IQuestionLevel2;
    level3?: IQuestionLevel3;
    level4?: IQuestionLevel4;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionLevels> = {
    id: 0,
};

export default () => <div />;
