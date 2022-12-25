import { AnswerOptionsType } from '../../../../components/enumerations/answer-options-type.model';
import { AnswerOptionsSeparator } from '../../../../components/enumerations/answer-options-separator.model';
import { QuestionNumberPosition } from '../../../../components/enumerations/question-number-position.model';
import { SourceEnpoint } from '../../../../components/enumerations/source-enpoint.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IQuestionImportTemplate {
    id?: number;
    justificationCursive?: boolean;
    justificationBold?: boolean;
    justificationInsensitive?: boolean;
    justificationText?: string;
    resolutionCorrectAnswerMark?: string;
    resolutionCursive?: boolean;
    resolutionBold?: boolean;
    resolutionInsensitive?: boolean;
    resolutionText?: string;
    answerOptionsCursive?: boolean;
    answerOptionsBold?: boolean;
    answerOptionsType?: AnswerOptionsType;
    answerOptionsSeparator?: AnswerOptionsSeparator;
    answerOptionsList?: boolean;
    answerOptionsTable?: boolean;
    answersCursive?: boolean;
    answersBold?: boolean;
    answersInsensitive?: boolean;
    answersText?: string;
    enunciadoCursive?: boolean;
    enunciadoBold?: boolean;
    enunciadoInsensitive?: boolean;
    enunciadoText?: string;
    questionNumberPosition?: QuestionNumberPosition;
    questionCursiveNumber?: boolean;
    questionCursiveText?: boolean;
    questionCursiveAll?: boolean;
    questionBoldNumber?: boolean;
    questionBoldText?: boolean;
    questionBoldAll?: boolean;
    questionInsensitive?: boolean;
    questionText?: string;
    templateName?: string;
    sourceEnpoint?: SourceEnpoint;
    sourceEnpointLink?: string;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IQuestionImportTemplate> = {
    id: 0,
};

export default () => <div />;
