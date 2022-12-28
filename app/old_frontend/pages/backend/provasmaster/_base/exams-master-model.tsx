import { IExamsMasterKnowledgeArea } from '../../provasmasterareaconhecimentos/_base/exams-master-knowledge-area-model';
import { IMaster } from '../../master/_base/master-model';
import { IExam } from '../../exam/_base/exam-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExamsMaster {
    id?: number;
    year?: number;
    status?: string;
    cardPrinted?: boolean;
    examsMasterKnowledgeArea?: IExamsMasterKnowledgeArea[];
    master?: IMaster;
    exam?: IExam;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExamsMaster> = {
    id: 0,
};

export default () => <div />;
