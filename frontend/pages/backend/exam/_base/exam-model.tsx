import { IExamConfigureApplication } from '../../../backend/examconfigureapplication/_base/exam-configure-application-model';
import { IStudentExam } from '../../../backend/studentexam/_base/student-exam-model';
import { IExamCardRead } from '../../../backend/leiturascartoesprova/_base/exam-card-read-model';
import { IExamsMaster } from '../../../backend/provasmaster/_base/exams-master-model';
import { IDiscipline } from '../../../backend/discipline/_base/discipline-model';
import { IExamTemplate } from '../../../backend/teststemplates/_base/exam-template-model';
import { IExamType } from '../../../backend/cad_prova_tipo/_base/exam-type-model';
import { ICerneDegree } from '../../../backend/degree/_base/cerne-degree-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExam {
    id?: number;
    year?: number;
    company?: string;
    description?: any;
    hasForeignLanguage?: boolean;
    emailWord?: string;
    typeIdTest?: number;
    dayApplication?: number;
    superProId?: number;
    examData?: any;
    instructions?: any;
    systemEvaluation?: string;
    urlS3?: string;
    examConfigureApplication?: IExamConfigureApplication[];
    studentExam?: IStudentExam[];
    examCardRead?: IExamCardRead[];
    examsMaster?: IExamsMaster[];
    discipline?: IDiscipline;
    examTemplate?: IExamTemplate[];
    examType?: IExamType;
    cerneDegree?: ICerneDegree;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExam> = {
    id: 0,
};

export default () => <div />;
