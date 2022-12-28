import { IExam } from '../../exam/_base/exam-model';
import { IKnowledgeArea } from '../../areaconhecimento/_base/knowledge-area-model';
import { IMasterTeacher } from '../../masterprofessor/_base/master-teacher-model';
import { ICernePlataformUser } from '../../cerneplataformuser/_base/cerne-plataform-user-model';
import { IContents } from '../../contents/_base/contents-model';
import { IExamTemplate } from '../../teststemplates/_base/exam-template-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IDiscipline {
    id?: number;
    code?: string;
    name?: string;
    sigla?: string;
    exam?: IExam[];
    knowledgeArea?: IKnowledgeArea[];
    masterTeacher?: IMasterTeacher[];
    cernePlataformUser?: ICernePlataformUser[];
    contents?: IContents[];
    examTemplate?: IExamTemplate;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IDiscipline> = {
    id: 0,
};

export default () => <div />;
