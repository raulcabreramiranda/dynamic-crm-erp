import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { ICernePlataform } from '../../cerneplataform/_base/cerne-plataform-model';
import { ICerneClass } from '../../class/_base/cerne-class-model';
import { ICerneDegree } from '../../degree/_base/cerne-degree-model';
import { IDiscipline } from '../../discipline/_base/discipline-model';
import { UserType } from '../../../../components/enumerations/user-type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ICernePlataformUser {
    id?: number;
    year?: number;
    userType?: UserType;
    user?: IAdminUser;
    plataform?: ICernePlataform;
    class?: ICerneClass;
    degree?: ICerneDegree;
    discipline?: IDiscipline;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ICernePlataformUser> = {
    id: 0,
};

export default () => <div />;
