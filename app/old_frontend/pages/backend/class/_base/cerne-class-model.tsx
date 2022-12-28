import { IExamConfigureApplication } from '../../examconfigureapplication/_base/exam-configure-application-model';
import { ICernePlataformUser } from '../../cerneplataformuser/_base/cerne-plataform-user-model';
import { IEssay } from '../../essay/_base/essay-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { IConfigureApplication } from '../../configureapplication/_base/configure-application-model';
import { IConfigureCorrection } from '../../configurecorrection/_base/configure-correction-model';
import { ICerneDegree } from '../../degree/_base/cerne-degree-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ICerneClass {
    id?: number;
    name?: string;
    examConfigureApplication?: IExamConfigureApplication[];
    cernePlataformUser?: ICernePlataformUser[];
    essays?: IEssay[];
    adminUsers?: IAdminUser[];
    configureApplications?: IConfigureApplication[];
    configureCorrections?: IConfigureCorrection[];
    cerneDegrees?: ICerneDegree[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ICerneClass> = {
    id: 0,
};

export default () => <div />;
