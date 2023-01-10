import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Dayjs } from 'dayjs';

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
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IAdminWhiteLabel> = {
    id: 0,
};

export default () => <div />;
