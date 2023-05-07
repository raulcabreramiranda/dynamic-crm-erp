import { IAdminUser, IAdminUserFilter } from 'src/components/models/AdminUser/admin-user-model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathAdminWhiteLabel = 'admin-white-labels';
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

export interface IAdminWhiteLabelFilter {
    id?: IFilter<number>;
    name?: IFilter<string>;
    logoContentType?: string;
    logoBase64?: string;
    logoFileName?: string;
    logo?: IFilter<any>;
    socialReason?: IFilter<string>;
    fantasyName?: IFilter<string>;
    cnpj?: IFilter<string>;
    zipCode?: IFilter<string>;
    street?: IFilter<string>;
    complement?: IFilter<string>;
    number?: IFilter<string>;
    neighborhood?: IFilter<string>;
    city?: IFilter<string>;
    uf?: IFilter<string>;
    adminUsers?: IAdminUserFilter[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminWhiteLabelFilters extends IAdminWhiteLabelFilter {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminWhiteLabel> = {
    id: 0,
};

export default () => <div />;
