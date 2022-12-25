import { IQuestionLevels } from '../../../backend/questionLevels/_base/question-levels-model';
import { IExamTemplate } from '../../../backend/teststemplates/_base/exam-template-model';
import { IQuestionAlternative } from '../../../backend/questionAlternative/_base/question-alternative-model';
import { IQuestionText } from '../../../backend/questionText/_base/question-text-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestion {
    id?: number;
    numberAlternatives?: number;
    sourceId?: number;
    year?: number;
    originalNumber?: number;
    createDate?: string;
    languageOptionId?: boolean;
    authorId?: number;
    annulled?: boolean;
    alternativeCorrect?: number;
    externalCode?: number;
    enunciationText?: any;
    enunciationImage?: string;
    resolutionText?: any;
    resolutionImage?: string;
    justification?: any;
    internalCode?: string;
    version?: string;
    difficulty?: number;
    discrimination?: number;
    pseudoguessing?: number;
    evolucionalquestionid?: number;
    rtfLinkResolucao?: string;
    rtfLinkEnunciation?: string;
    questionLevels?: IQuestionLevels[];
    examTemplate?: IExamTemplate[];
    questionAlternative?: IQuestionAlternative[];
    questionText?: IQuestionText[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestion> = {
    id: 0,
};

export default () => <div />;
