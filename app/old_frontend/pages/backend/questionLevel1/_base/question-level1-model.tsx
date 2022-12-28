import { IQuestionMatrix } from '../../questionMatrix/_base/question-matrix-model';
import { IQuestionLevel2 } from '../../questionLevel2/_base/question-level2-model';
import { IQuestionLevels } from '../../questionLevels/_base/question-levels-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionLevel1 {
    id?: number;
    name?: string;
    description?: string;
    type?: number;
    externalCode?: number;
    shortName?: string;
    matrix?: IQuestionMatrix;
    level2?: IQuestionLevel2[];
    questionLevels?: IQuestionLevels[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionLevel1> = {
    id: 0,
};

export default () => <div />;
