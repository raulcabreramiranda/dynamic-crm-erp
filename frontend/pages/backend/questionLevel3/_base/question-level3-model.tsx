import { IContentsMasterTeacher } from '../../../backend/masterusuariosconteudos/_base/contents-master-teacher-model';
import { IQuestionLevel2 } from '../../../backend/questionLevel2/_base/question-level2-model';
import { IQuestionLevel4 } from '../../../backend/questionLevel4/_base/question-level4-model';
import { IQuestionLevels } from '../../../backend/questionLevels/_base/question-levels-model';
import { IExamTemplate } from '../../../backend/teststemplates/_base/exam-template-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionLevel3 {
    id?: number;
    name?: string;
    description?: string;
    externalCode?: number;
    enemincidenceparameter?: number;
    enemIncidencePercent?: number;
    contentsMasterTeacher?: IContentsMasterTeacher[];
    level2?: IQuestionLevel2;
    level4?: IQuestionLevel4[];
    questionLevels?: IQuestionLevels[];
    examTemplate?: IExamTemplate[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionLevel3> = {
    id: 0,
};

export default () => <div />;
