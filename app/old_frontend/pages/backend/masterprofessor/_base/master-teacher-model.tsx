import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { IDiscipline } from '../../discipline/_base/discipline-model';
import { IExamsMasterKnowledgeArea } from '../../provasmasterareaconhecimentos/_base/exams-master-knowledge-area-model';
import { Type } from '../../../../components/enumerations/type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IMasterTeacher {
    id?: number;
    finished?: boolean;
    finishedReview?: boolean;
    type?: Type;
    teacher?: IAdminUser;
    discipline?: IDiscipline;
    examsMasterKnowledgeArea?: IExamsMasterKnowledgeArea;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IMasterTeacher> = {
    id: 0,
};

export default () => <div />;
