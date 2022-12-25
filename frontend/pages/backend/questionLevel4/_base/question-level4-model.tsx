import { IQuestionLevel3 } from '../../../backend/questionLevel3/_base/question-level3-model';
import { IQuestionLevels } from '../../../backend/questionLevels/_base/question-levels-model';
import { IExamTemplate } from '../../../backend/teststemplates/_base/exam-template-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionLevel4 {
    id?: number;
    name?: string;
    description?: string;
    externalCode?: number;
    level3?: IQuestionLevel3;
    questionLevels?: IQuestionLevels[];
    examTemplate?: IExamTemplate[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionLevel4> = {
    id: 0,
};

export default () => <div />;
