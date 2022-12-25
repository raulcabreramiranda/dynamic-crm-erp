import { ICernePlataformUser } from '../../../backend/cerneplataformuser/_base/cerne-plataform-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ICernePlataform {
    id?: number;
    name?: string;
    link?: string;
    assessmentModelId?: number;
    api?: string;
    token?: string;
    domain?: string;
    clientId?: number;
    clientName?: string;
    clientPrimaryColor?: string;
    clientSecondaryColor?: string;
    clientImage?: string;
    clientImageHeader?: string;
    clientImageFooter?: string;
    cernePlataformUser?: ICernePlataformUser[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ICernePlataform> = {
    id: 0,
};

export default () => <div />;
