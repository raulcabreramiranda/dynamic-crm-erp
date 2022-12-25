import { IStudentQuestion } from '../../../backend/studentquestion/_base/student-question-model';
import { IQuestionLevel2 } from '../../../backend/questionLevel2/_base/question-level2-model';
import { IQuestionLevel3 } from '../../../backend/questionLevel3/_base/question-level3-model';
import { IQuestionLevel4 } from '../../../backend/questionLevel4/_base/question-level4-model';
import { IExam } from '../../../backend/exam/_base/exam-model';
import { IQuestion } from '../../../backend/question/_base/question-model';
import { IDiscipline } from '../../../backend/discipline/_base/discipline-model';
import { Gabarito } from '../../../../components/enumerations/gabarito.model';
import { TypeQuestion } from '../../../../components/enumerations/type-question.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExamTemplate {
    id?: number;
    gabarito?: Gabarito;
    feedbackQuestion?: any;
    typeQuestion?: TypeQuestion;
    questionNumber?: number;
    enunciationText?: any;
    scoreQuestion?: number;
    questionCanceled?: boolean;
    studentQuestion?: IStudentQuestion[];
    conteudoLevel2?: IQuestionLevel2;
    subConteudoLevel3?: IQuestionLevel3;
    itemLevel4?: IQuestionLevel4;
    exam?: IExam;
    bankQuestion?: IQuestion;
    discipline?: IDiscipline[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExamTemplate> = {
    id: 0,
};

export default () => <div />;
