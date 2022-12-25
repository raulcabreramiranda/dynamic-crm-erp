import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IAdminWhiteLabel {
    id?: number;
    name?: string;
    logoContentType?: string;
    logoBase64?: string;
    logoFileName?: string;
    logo?: any;
    socialReason?: string;
    fantasyName?: string;
    cnpj?: string;
    zipCode?: string;
    street?: string;
    complement?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    uf?: string;
    adminUsers?: IAdminUser[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminWhiteLabel> = {
    id: 0,
};

export default () => <div />;
