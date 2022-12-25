import { IExamsMasterKnowledgeArea } from '../../../backend/provasmasterareaconhecimentos/_base/exams-master-knowledge-area-model';
import { IDiscipline } from '../../../backend/discipline/_base/discipline-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IKnowledgeArea {
    id?: number;
    name?: string;
    sigla?: string;
    examsMasterKnowledgeArea?: IExamsMasterKnowledgeArea[];
    disciplines?: IDiscipline[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IKnowledgeArea> = {
    id: 0,
};

export default () => <div />;
