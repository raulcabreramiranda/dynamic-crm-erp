import { IMasterTeacher } from '../../masterprofessor/_base/master-teacher-model';
import { IContentsMasterTeacher } from '../../masterusuariosconteudos/_base/contents-master-teacher-model';
import { IExamsMaster } from '../../provasmaster/_base/exams-master-model';
import { IKnowledgeArea } from '../../areaconhecimento/_base/knowledge-area-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExamsMasterKnowledgeArea {
    id?: number;
    configurationDeadline?: string;
    review?: boolean;
    reviewDeadline?: string;
    percentageMaximum?: number;
    incidence?: number;
    entropy?: number;
    concordance?: number;
    masterTeacher?: IMasterTeacher[];
    contentsMasterTeacher?: IContentsMasterTeacher[];
    examsMaster?: IExamsMaster;
    knowledgeArea?: IKnowledgeArea;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExamsMasterKnowledgeArea> = {
    id: 0,
};

export default () => <div />;
