import { IStudentQuestion } from '../../studentquestion/_base/student-question-model';
import { IQuestionLevel2 } from '../../questionLevel2/_base/question-level2-model';
import { IQuestionLevel3 } from '../../questionLevel3/_base/question-level3-model';
import { IQuestionLevel4 } from '../../questionLevel4/_base/question-level4-model';
import { IExam } from '../../exam/_base/exam-model';
import { IQuestion } from '../../question/_base/question-model';
import { IDiscipline } from '../../discipline/_base/discipline-model';
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
