import { IQuestionLevel3 } from '../../../backend/questionLevel3/_base/question-level3-model';
import { IExamsMasterKnowledgeArea } from '../../../backend/provasmasterareaconhecimentos/_base/exams-master-knowledge-area-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IContentsMasterTeacher {
    id?: number;
    active?: boolean;
    subContent?: IQuestionLevel3;
    examsMasterKnowledgeArea?: IExamsMasterKnowledgeArea;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IContentsMasterTeacher> = {
    id: 0,
};

export default () => <div />;
