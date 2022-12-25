import { IContents } from '../../../backend/contents/_base/contents-model';
import { IExam } from '../../../backend/exam/_base/exam-model';
import { ICernePlataformUser } from '../../../backend/cerneplataformuser/_base/cerne-plataform-user-model';
import { IJorneyDegree } from '../../../backend/jorneydegree/_base/jorney-degree-model';
import { ICerneClass } from '../../../backend/class/_base/cerne-class-model';
import { ITheme } from '../../../backend/theme/_base/theme-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ICerneDegree {
    id?: number;
    name?: string;
    position?: number;
    contents?: IContents[];
    exam?: IExam[];
    cernePlataformUser?: ICernePlataformUser[];
    jorneyDegrees?: IJorneyDegree[];
    cerneClasses?: ICerneClass[];
    themes?: ITheme[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ICerneDegree> = {
    id: 0,
};

export default () => <div />;
