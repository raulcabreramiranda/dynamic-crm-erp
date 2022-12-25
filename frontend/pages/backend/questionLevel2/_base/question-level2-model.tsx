import { IQuestionLevel1 } from '../../../backend/questionLevel1/_base/question-level1-model';
import { IQuestionLevel3 } from '../../../backend/questionLevel3/_base/question-level3-model';
import { IQuestionLevels } from '../../../backend/questionLevels/_base/question-levels-model';
import { IExamTemplate } from '../../../backend/teststemplates/_base/exam-template-model';
import { TypeSource } from '../../../../components/enumerations/type-source.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionLevel2 {
    id?: number;
    name?: string;
    description?: string;
    externalCode?: number;
    typeSource?: TypeSource;
    level1?: IQuestionLevel1;
    level3?: IQuestionLevel3[];
    questionLevels?: IQuestionLevels[];
    examTemplate?: IExamTemplate[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionLevel2> = {
    id: 0,
};

export default () => <div />;
